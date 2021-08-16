import React, { memo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { IItem } from '../BurgerIngredients';

import styles from './IngredientCard.module.css';

interface IProps {
  ingredientData: IItem;
  count?: number;
}

function IngredientCard({ ingredientData, count = 0 }: IProps) {
  return (
    <li className={styles.ingredient_card}>
      {count ? (
        <p className={styles.ingredient_count}>
          <span className="text text_type_digits-default">{count}</span>
        </p>
      ) : null}
      <img
        className={styles.ingredient_image}
        src={ingredientData.image}
        alt={`Изображение ${ingredientData.name}`}
      />
      <p className={`p-2 ${styles.ingredient_price_container}`}>
        <span className="text text_type_digits-default">
          {ingredientData.price}
        </span>
        <span className={styles.ingredient_price_icon}>
          <CurrencyIcon type="primary" />
        </span>
      </p>
      <p className={styles.ingredient_name}>
        <span className="text text_type_main-default">
          {ingredientData.name}
        </span>
      </p>
    </li>
  );
}

export default memo(IngredientCard);