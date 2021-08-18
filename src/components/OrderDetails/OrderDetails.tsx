import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { IOrder } from '../../models/order';

import styles from './OrderDetails.module.css';

interface IProps {
  order: IOrder;
}

export default function OrderDetails({ order }: IProps) {
  const { _id, status, status_text } = order;

  return (
    <div className={styles.order_details}>
      <p className={`pt-4 pb-4 text text_type_digits-large`}>
        <span>{_id}</span>
      </p>
      <p className={`pt-4 pb-15 text text_type_main-medium`}>
        <span>идентификатор заказа</span>
      </p>
      <div className={styles.order_icon}>
        {status === 'check' ? <CheckMarkIcon type="primary" /> : null}
      </div>
      <p className={`pt-15 pb-1 ${styles.status_text}`}>
        <span>{status_text}</span>
      </p>
      <p className={`pt-1 pb-1 ${styles.bottom_text}`}>
        <span>Дождитесь готовности на орбитальной станции</span>
      </p>
    </div>
  );
}
