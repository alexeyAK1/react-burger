import React from "react";
import { useParams } from "react-router-dom";
import OrderById from "../../components/order-by-id/order-by-id";
import MainAllLayouts from "../../layouts/main-all-layouts/main-all-layouts";

const OrderByIdPage = () => {
    const { id } = useParams<{ id: string }>();
    
  return (
    <MainAllLayouts>
      <OrderById id={id}/>
    </MainAllLayouts>
  );
};

export default OrderByIdPage;
