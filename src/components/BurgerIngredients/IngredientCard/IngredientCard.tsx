import React, { memo } from 'react';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './IngredientCard.module.css';
import { IIngredientsItem } from '../../../models/ingredients';

interface IProps {
  ingredientData: IIngredientsItem;
  count?: number;
}

function IngredientCard({ ingredientData, count = 0 }: IProps) {
  return (
    <li className={styles.ingredient_card}>
      {count ? (
        <div className={styles.ingredient_count}>
          <Counter count={count} size={count < 100 ? 'default' : 'small'} />
        </div>
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
