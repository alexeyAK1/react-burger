import {
    WS_ORDER_ALL_CLOSE,
    WS_ORDER_ALL_CONNECTION_START,
    WS_ORDER_CLOSE,
    WS_ORDER_CONNECTION_START
} from "./ws-action-types";

export const wsOrderAllConnectionStart = () => ({
  type: WS_ORDER_ALL_CONNECTION_START,
});
export const wsOrderAllClose = () => ({
  type: WS_ORDER_ALL_CLOSE,
});

export const wsOrderConnectionStart = () => ({
  type: WS_ORDER_CONNECTION_START,
});
export const wsOrderClose = () => ({
  type: WS_ORDER_CLOSE,
});
