import React, { FC, useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { IOrderFeedElement } from "../../models/order";
import OrderFeedElement from "../order-feed-element/order-feed-element";

interface IProps {
  orderFeedListElement: IOrderFeedElement[];
}

const OrderFeedElementsList: FC<IProps> = ({ orderFeedListElement }) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const handleOnClick = useCallback(
    (idFeed: string) => {
      history.push(`${path}/${idFeed}`);
    },
    [history, path]
  );
  return (
    <div>
      {orderFeedListElement.map((feedElement) => (
        <OrderFeedElement
          orderElement={feedElement}
          key={feedElement._id}
          OnClick={handleOnClick}
        />
      ))}
    </div>
  );
};

export default OrderFeedElementsList;
