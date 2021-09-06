import React, { memo } from 'react';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient-card.module.css';
import { IIngredientsItem } from '../../../../models/ingredients';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from '../../../../models/drag-and-drop';
import { useDispatch } from 'react-redux';
import { setCurrentIngredient } from '../../../../services/current-ingredient-slice';

interface IProps {
  ingredientData: IIngredientsItem;
  count?: number;
}

function IngredientCard({ ingredientData, count = 0 }: IProps) {
  const dispatch = useDispatch();
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.INGREDIENT_CARD,
    item: ingredientData,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleOnClick = () => {
    dispatch(setCurrentIngredient(ingredientData));
  };

  const opacity = isDragging ? 0.2 : 1;

  return (
    <>
      <DragPreviewImage connect={preview} src={ingredientData.image} />
      <li
        className={styles.ingredient_card}
        style={{ opacity }}
        onClick={handleOnClick}
        ref={drag}
      >
        {count ? (
          <div className={styles.ingredient_count}>
            <Counter count={count} size={count < 100 ? 'default' : 'small'} />
          </div>
        ) : null}
        <img
          className={styles.ingredient_image}
          src={ingredientData.image}
          alt={ingredientData.name}
        />
        <p className={`p-2 ${styles.ingredient_price_container}`}>
          <span className="text text_type_digits-default">
            {ingredientData.price / 100}
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
    </>
  );
}

export default memo(IngredientCard);
