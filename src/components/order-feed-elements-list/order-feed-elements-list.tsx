import React, { FC, useCallback } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { IOrderFeedElement } from "../../models/order";
import OrderFeedElement from "../order-feed-element/order-feed-element";

interface IProps {
  orderFeedListElement: IOrderFeedElement[];
}

const OrderFeedElementsList: FC<IProps> = ({ orderFeedListElement }) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const handleOnClick = useCallback(
    (idFeed: string) => {
      history.push({
        pathname: `${path}/${idFeed}`,
        state: { background: location },
      });
    },
    [history, location, path]
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
