import React, { useContext, useEffect, useState } from 'react';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrder } from '../../models/order1';
import { BurgerConstructorContext } from '../burger-constructor/services/burger-constructor-context';
import Loader from '../ui1/loader1/loader1';

import styles from './order-details.module.css';

export default function OrderDetails() {
  const context = useContext(BurgerConstructorContext);
  const [localOder, setOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    if (context && context?.order) {
      setOrder({ ...context?.order });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.order]);

  if (localOder) {
    const {
      name,
      order: { number: orderNumber },
      success,
    } = localOder;

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
