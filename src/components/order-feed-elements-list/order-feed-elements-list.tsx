import React, { FC, useCallback } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { IOrderFeedElementWithIngredients } from "../../models/order";
import OrderFeedElement from "../order-feed-element/order-feed-element";

interface IProps {
  orderFeedListElement: IOrderFeedElementWithIngredients[];
  showStatus?: boolean;
}

const OrderFeedElementsList: FC<IProps> = ({ orderFeedListElement, showStatus = false }) => {
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
          showStatus={showStatus}
          OnClick={handleOnClick}
        />
      ))}
    </div>
  );
};

export default OrderFeedElementsList;
