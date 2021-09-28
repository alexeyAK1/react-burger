import React from 'react';
import OrderFeed from '../../components/order-feed/order-feed';
import MainAllLayouts from '../../layouts/main-all-layouts/main-all-layouts';


export default function FeedPage() {
  return (
    <MainAllLayouts>
      <OrderFeed />
    </MainAllLayouts>
  );
}