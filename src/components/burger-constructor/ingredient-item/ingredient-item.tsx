import React, { memo } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient-item.module.css';

interface IProps {
  isTop?: boolean;
  isBottom?: boolean;
  image: string;
  name: string;
  price: number;
}

function IngredientItem({
  isTop = false,
  isBottom = false,
  image,
  name,
  price,
}: IProps) {
  const type = isTop ? 'top' : isBottom ? 'bottom' : undefined;
  const isLocked = isTop || isBottom ? true : false;

  return (
    <div className={styles.ingredient_item}>
      <div className={styles.drag_container}>
        {isTop || isBottom ? null : <DragIcon type="primary" />}
      </div>
      <div className={styles.item_container}>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={`${name}${isTop ? ' (верх)' : isBottom ? ' (низ)' : ''}`}
          price={price}
          thumbnail={image}
        />
      </div>
    </div>
  );
}

export default memo(IngredientItem);
