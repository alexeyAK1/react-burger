import { AnyAction } from "@reduxjs/toolkit";
import { Api } from "../../api/api";
import { getRefreshToken } from "../../api/auth";
import WS from "../../api/ws";
import { IIngredientsItem } from "../../models/ingredients";
import {
  IOrderFeedElement,
  IOrderFeedElementWithIngredients,
  IOrdersFeed,
  IOrdersFeedFetch,
  IOrdersFeedWithIngredients
} from "../../models/order";

const api = Api.getInstance();

export type TWsWorker = {
  wsUrl: string;
  wsName: string;
  ingredients: IIngredientsItem[];
  onMessageCallBack: (orderFeed: IOrdersFeedWithIngredients) => void;
  action: AnyAction;
  typeWsStart: string;
  protect?: boolean;
  typeWsSend?: string;
  typeWsClose?: string;
  isInvertReturnedIngredients?: boolean;
  wsStartCallBack?: () => void;
};

const sockets = WS.getInstance();

export const wsWorker = async <T extends IOrdersFeedFetch>({
  wsUrl,
  wsName,
  ingredients,
  onMessageCallBack,
  action,
  typeWsStart,
  protect = false,
  typeWsSend,
  typeWsClose,
  isInvertReturnedIngredients = false,
  wsStartCallBack,
}: TWsWorker) => {
  const { type, payload } = action;

  if (type === typeWsStart) {
    if (wsStartCallBack) {
      wsStartCallBack();
    }
    if (protect) {
      try {
        await getRefreshToken();
      } catch (error) {
        console.log(error);
      }
    }
    if (api.isLoadingRefreshToken) {
      await api.waitFor(
        () => api.isLoadingRefreshToken,
        () =>
          sockets.addSocket(
            wsName,
            `${wsUrl}${protect ? `?token=${api.token}` : ""}`
          )
      );
    } else {
      sockets.addSocket(
        wsName,
        `${wsUrl}${protect ? `?token=${api.token}` : ""}`
      );
    }
  }

  if (sockets.getSocket(wsName)) {
    const socketItem = sockets.getSocket(wsName);
    socketItem!.onopen = (event) => {
      console.log(`${wsName}:SUCCESS`, event);
    };
    socketItem!.onerror = (event) => {
      console.log(`${wsName}:ERROR`, event);
    };
    socketItem!.onmessage = (event) => {
      getOnMessage<T>(
        event,
        socketItem!,
        ingredients,
        onMessageCallBack,
        isInvertReturnedIngredients
      );
    };
    socketItem!.onclose = (event) => {
      console.log(`${wsName}:CLOSE`, event);
    };

    if (typeWsSend && type === typeWsSend) {
      const message = payload;
      socketItem!.send(JSON.stringify(message));
    }
    if (typeWsClose && type === typeWsClose) {
      sockets.closeSocket(wsName);
    }
  }
};

const getOnMessage = <T extends IOrdersFeedFetch>(
  event: MessageEvent,
  socket: WebSocket,
  ingredients: IIngredientsItem[],
  callBack: (orderFeed: IOrdersFeedWithIngredients) => void,
  isReverse: boolean = false
) => {
  if (event.data === "ping") {
    socket.send("pong");
  }
  const { data } = event;
  const parsedData = JSON.parse(data) as T;
  if (parsedData.success) {
    const orderFeed = addIngredientsToFeed(parsedData, ingredients, isReverse);

    callBack(orderFeed);
  }
};

const addIngredientsToFeed = (
  ordersFeed: IOrdersFeed,
  ingredients: IIngredientsItem[],
  isReverse: boolean = false
): IOrdersFeedWithIngredients => {
  const newOrders = ordersFeed.orders.reduce<
    IOrderFeedElementWithIngredients[]
  >(getOrdersWithIngredients(ingredients), []);

  if (isReverse) {
    newOrders.reverse();
  }

  return { ...ordersFeed, orders: newOrders };
};

const getOrdersWithIngredients =
  (ingredients: IIngredientsItem[]) =>
  (
    returnOrdersObj: IOrderFeedElementWithIngredients[],
    orderFeedItem: IOrderFeedElement
  ): IOrderFeedElementWithIngredients[] => {
    const newIngredients = getIngredientsById(orderFeedItem, ingredients);

    const newOrderFeed: IOrderFeedElementWithIngredients = {
      ...orderFeedItem,
      ingredients: [...newIngredients],
    };
    returnOrdersObj.push(newOrderFeed);

    return returnOrdersObj;
  };

const getIngredientsById = (
  orderFeedItem: IOrderFeedElement,
  ingredients: IIngredientsItem[]
) => {
  const newIngredients: IIngredientsItem[] = [];

  orderFeedItem.ingredients.forEach((ingredientId) => {
    const newIngredientElement = findIngredientItemById(
      ingredients,
      ingredientId
    );

    if (newIngredientElement) {
      newIngredients.push({ ...newIngredientElement });
    }
  });

  return newIngredients;
};

const findIngredientItemById = (
  ingredients: IIngredientsItem[],
  ingredientId: string
) => {
  return ingredients.find((ingredient) => ingredient._id === ingredientId);
};
