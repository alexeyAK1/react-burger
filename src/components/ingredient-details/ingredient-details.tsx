import React from 'react';
import { IIngredientsItem } from '../../models/ingredients1';

import styles from './ingredient-details.module.css';

interface IProps {
  ingredient: IIngredientsItem;
}

export default function IngredientDetails({ ingredient }: IProps) {
  const { image_large, name, calories, carbohydrates, fat, proteins } =
    ingredient;

  return (
    <div className={styles.ingredient_details}>
      <img
        className={styles.ingredient_image}
        alt={`Картинка ${name}`}
        src={image_large}
      />
      <p
        className={`text text_type_main-medium pt-4 pb-7 ${styles.ingredient_name}`}
      >
        <span>{name}</span>
      </p>
      <ul className={`${styles.ingredient_info}`}>
        <li>
          <p>
            <span>Калории,ккал</span>
          </p>
          <p>
            <span>{calories}</span>
          </p>
        </li>
        <li>
          <p>
            <span>Белки, г</span>
          </p>
          <p>
            <span>{proteins}</span>
          </p>
        </li>
        <li>
          <p>
            <span>Жиры, г</span>
          </p>
          <p>
            <span>{fat}</span>
          </p>
        </li>
        <li>
          <p>
            <span>Углеводы, г</span>
          </p>
          <p>
            <span>{carbohydrates}</span>
          </p>
        </li>
      </ul>
    </div>
  );
}
