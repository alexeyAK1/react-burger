import { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { Api } from "../../api/api";
import { getRefreshToken } from "../../api/auth";
import WS from "../../api/ws";
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

const ws1 = "orders_all";
const ws2 = "orders";

const api = Api.getInstance();
const sockets = WS.getInstance();

export const socketMiddleware = (): Middleware<{}> => {
  return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    return (next: TAppDispatch) =>
      async <A extends AnyAction>(action: A) => {
        const { dispatch, getState } = store;
        const { type } = action;

        if (type === WS_ORDER_ALL_CONNECTION_START) {
          sockets.addSocket(ws1, "wss://norma.nomoreparties.space/orders/all");
        }

        wsWorker({
          wsName: ws1,
          action,
          getState,
          onMessageCallBack: (orderFeed: IOrdersFeedWithIngredients) => {
            dispatch(setOrderFeedAll(orderFeed));
          },
          typeWsSend: WS_ORDER_ALL_SEND_MESSAGE,
          typeWsClose: WS_ORDER_ALL_CLOSE,
        });

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

        wsWorker({
          wsName: ws2,
          action,
          getState,
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
