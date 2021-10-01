import { AnyAction } from "@reduxjs/toolkit";
import WS from "../../api/ws";
import { IIngredientsItem } from "../../models/ingredients";
import {
    IOrderFeedElement,
    IOrderFeedElementWithIngredients,
    IOrdersFeed,
    IOrdersFeedFetch,
    IOrdersFeedWithIngredients
} from "../../models/order";
import { TRootState } from "../../services/store";

export type TWsWorker = {
  wsName: string;
  getState: () => TRootState;
  onMessageCallBack: (orderFeed: IOrdersFeedWithIngredients) => void;
  action?: AnyAction;
  typeWsSend?: string;
  typeWsClose?: string;
  isInvertReturnedIngredients?: boolean;
};

const sockets = WS.getInstance();

export const wsWorker = <T extends IOrdersFeedFetch>({
  wsName,
  getState,
  onMessageCallBack,
  action,
  typeWsSend,
  typeWsClose,
  isInvertReturnedIngredients=false,
}: TWsWorker) => {
  if (sockets.getSocket(wsName)) {
    const socketItem = sockets.getSocket(wsName);
    socketItem!.onopen = (event) => {
      console.log(`${wsName}:SUCCESS`, event);
    };
    socketItem!.onerror = (event) => {
      console.log(`${wsName}:ERROR`, event);
    };
    socketItem!.onmessage = (event) => {
      getOnMessage<T>(event, socketItem!, getState, onMessageCallBack, isInvertReturnedIngredients);
    };
    socketItem!.onclose = (event) => {
      console.log(`${wsName}:CLOSE`, event);
    };

    if (action) {
      const { type, payload } = action;

      if (typeWsSend && type === typeWsSend) {
        const message = payload;
        socketItem!.send(JSON.stringify(message));
      }
      if (typeWsClose && type === typeWsClose) {
        sockets.closeSocket(wsName);
      }
    }
  }
};

const getOnMessage = <T extends IOrdersFeedFetch>(
  event: MessageEvent,
  socket: WebSocket,
  getState: () => TRootState,
  callBack: (orderFeed: IOrdersFeedWithIngredients) => void,
  isReverse: boolean = false
) => {
  if (event.data === "ping") {
    socket.send("pong");
  }
  const { data } = event;
  const parsedData = JSON.parse(data) as T;
  if (parsedData.success) {
    const ingredients = getState().ingredients.ingredients;
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
