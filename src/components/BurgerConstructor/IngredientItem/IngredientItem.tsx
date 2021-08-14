import React from 'react';
import {
  CurrencyIcon,
  DeleteIcon,
  DragIcon,
  LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './IngredientItem.module.css';

interface IProps {
  isTop?: boolean;
  isBottom?: boolean;
  image: string;
  name: string;
  price: number;
}

export default function IngredientItem({
  isTop = false,
  isBottom = false,
  image,
  name,
  price,
}: IProps) {
  return (
    <div className={styles.ingredient_item}>
      <div className={styles.drag_container}>
        {isTop || isBottom ? null : <DragIcon type="primary" />}
      </div>
      <div
        className={`${styles.item_container} ${
          isTop ? styles.item_container_top : ''
        } ${isBottom ? styles.item_container_bottom : ''}
        }`}
      >
        <img
          className={`pr-5 ${styles.item_image}`}
          src={image}
          alt={`Картинка ${name}`}
        />
        <p className={styles.item_name}>
          <span>{name}</span>
        </p>
        <p className={`pl-5 pr-6 ${styles.item_price_container}`}>
          <span className="text text_type_digits-default">{price}</span>
          <span className={styles.item_price_icon}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <p className={styles.item_delete}>
          {isTop || isBottom ? (
            <LockIcon type="secondary" />
          ) : (
            <DeleteIcon type="primary" />
          )}
        </p>
      </div>
    </div>
  );
}
