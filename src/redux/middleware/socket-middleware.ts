import { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { Api } from "../../api/api";
import { getRefreshToken } from "../../api/auth";
import { IOrdersFeedWithIngredients } from "../../models/order";
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
import { wsWorker } from "./common";

const api = Api.getInstance();

export const socketMiddleware = (): Middleware<{}> => {
  return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    return (next: TAppDispatch) =>
      async <A extends AnyAction>(action: A) => {
        const { dispatch, getState } = store;
        const ingredients = getState().ingredients.ingredients;

        await wsWorker({
          typeWsStart: WS_ORDER_ALL_CONNECTION_START,
          wsUrl: "wss://norma.nomoreparties.space/orders/all",
          wsName: "orders_all",
          action,
          ingredients,
          onMessageCallBack: (orderFeed: IOrdersFeedWithIngredients) => {
            dispatch(setOrderFeedAll(orderFeed));
          },
          typeWsSend: WS_ORDER_ALL_SEND_MESSAGE,
          typeWsClose: WS_ORDER_ALL_CLOSE,
        });

        wsWorker({
          typeWsStart: WS_ORDER_CONNECTION_START,
          wsUrl: `wss://norma.nomoreparties.space/orders?token=${api.token}`,
          wsStartCallBack: async () => {
            try {
              await getRefreshToken();
            } catch (error) {
              console.log(error);
            }
          },
          wsName: "orders",
          action,
          ingredients,
          onMessageCallBack: (orderFeed: IOrdersFeedWithIngredients) => {
            dispatch(setOrderFeed(orderFeed));
          },
          typeWsSend: WS_ORDER_SEND_MESSAGE,
          typeWsClose: WS_ORDER_CLOSE,
          isInvertReturnedIngredients: true,
        });

        next(action);
      };
  };
};
