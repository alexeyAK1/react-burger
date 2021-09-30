import { AnyAction, Middleware, MiddlewareAPI } from "redux";
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
import { setOrderFeed, setOrderFeedAll } from "../../services/order-slice";
import { TAppDispatch, TRootState } from "../../services/store";
import {
  WS_ORDER_ALL_CLOSE,
  WS_ORDER_ALL_CONNECTION_START,
  WS_ORDER_ALL_SEND_MESSAGE,
  WS_ORDER_CLOSE,
  WS_ORDER_CONNECTION_START,
  WS_ORDER_SEND_MESSAGE
} from "../action-types/ws-action-types";

const ws1 = "orders_all";
const ws2 = "orders";

const api = Api.getInstance();
const sockets = WS.getInstance();

export const socketMiddleware = (): Middleware<{}> => {
  return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    return (next: TAppDispatch) =>
      async <A extends AnyAction>(action: A) => {
        const { dispatch, getState } = store;
        const { type, payload } = action;

        if (type === WS_ORDER_ALL_CONNECTION_START) {
          sockets.addSocket(ws1, "wss://norma.nomoreparties.space/orders/all");
        }
        if (sockets.getSocket(ws1)) {
          const socket1 = sockets.getSocket(ws1);

          socket1!.onopen = (event) => {
            console.log("SUCCESS-1", event);
          };
          socket1!.onerror = (event) => {
            console.log("ERROR-1", event);
          };
          socket1!.onmessage = (event) => {
            if (event.data === "ping") {
              socket1!.send("pong");
            }
            const { data } = event;
            const parsedData = JSON.parse(data) as IOrdersFeedFetch;

            if (parsedData.success) {
              const ingredients = getState().ingredients.ingredients;
              const orderFeed = addIngredientsToFeed(parsedData, ingredients);

              dispatch(setOrderFeedAll(orderFeed));
            }
          };
          socket1!.onclose = (event) => {
            console.log("CLOSE-1", event);
          };
          if (type === WS_ORDER_ALL_SEND_MESSAGE) {
            const message = payload;
            socket1!.send(JSON.stringify(message));
          }
          if (type === WS_ORDER_ALL_CLOSE) {
            sockets.closeSocket(ws1);
          }
        }

        if (type === WS_ORDER_CONNECTION_START) {
          try {
            await getRefreshToken();
          } catch (error) {
            console.log(error);
          }
          sockets.addSocket(
            ws2,
            `wss://norma.nomoreparties.space/orders?token=${api.token}`
          );
        }
        if (sockets.getSocket(ws2)) {
          const socket2 = sockets.getSocket(ws2);
          socket2!.onopen = (event) => {
            console.log("SUCCESS-2", event);
          };
          socket2!.onerror = (event) => {
            console.log("ERROR-2", event);
          };
          socket2!.onmessage = (event) => {
            const { data } = event;
            // console.log("MESSAGE-2", event);
            const parsedData = JSON.parse(data) as IOrdersFeedFetch;
            if (parsedData.success) {
              const ingredients = getState().ingredients.ingredients;
              const orderFeed = addIngredientsToFeed(
                parsedData,
                ingredients,
                true
              );

              dispatch(setOrderFeed(orderFeed));
            }
          };
          socket2!.onclose = (event) => {
            console.log("CLOSE-2", event);
          };
          if (type === WS_ORDER_SEND_MESSAGE) {
            const message = payload;
            socket2!.send(JSON.stringify(message));
          }
          if (type === WS_ORDER_CLOSE) {
            sockets.closeSocket(ws2);
          }
        }

        next(action);
      };
  };
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
    const newIngredientElement = ingredients.find(
      (ingredient) => ingredient._id === ingredientId
    );

    if (newIngredientElement) {
      newIngredients.push({ ...newIngredientElement });
    }
  });

  return newIngredients;
};
