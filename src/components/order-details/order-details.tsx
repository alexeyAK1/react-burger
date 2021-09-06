import React from 'react';
import { useSelector } from 'react-redux';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../ui/loader/loader';
import styles from './order-details.module.css';
import { RootState } from '../../redux/store';

export default function OrderDetails() {
  const order = useSelector((state: RootState) => state.order.order);
  const isLoading = useSelector((state: RootState) => state.order.isLoading);

  if (!isLoading && order) {
    const {
      name,
      order: { number: orderNumber },
      success,
    } = order;

    return (
      <div className={styles.order_details}>
        <p className={`pt-4 pb-4 text text_type_digits-large`}>
          <span>{orderNumber}</span>
        </p>
        <p className={`pt-4 pb-15 text text_type_main-medium`}>
          <span>идентификатор заказа</span>
        </p>
        <div className={styles.order_icon}>
          {success ? <CheckMarkIcon type="primary" /> : null}
        </div>
        <p className={`pt-15 pb-1 ${styles.status_text}`}>
          <span>{name}</span>
        </p>
        <p className={`pt-1 pb-1 ${styles.bottom_text}`}>
          <span>Дождитесь готовности на орбитальной станции</span>
        </p>
      </div>
    );
  } else {
    return (
      <div className={styles.order_details}>
        <Loader />
      </div>
    );
  }
}
