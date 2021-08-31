import React, { memo, MouseEvent, useCallback, useState } from 'react';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient-card.module.css';
import { IIngredientsItem } from '../../../models/ingredients';
import Modal from '../../common/modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';

interface IProps {
  ingredientData: IIngredientsItem;
  count?: number;
}

function IngredientCard({ ingredientData, count = 0 }: IProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onCloseModal = useCallback((e?: MouseEvent<HTMLElement>) => {
    if (e) {
      e.stopPropagation();
    }

    setIsOpenModal(false);
  }, []);

  const onOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <li className={styles.ingredient_card} onClick={onOpenModal}>
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
      {isOpenModal ? (
        <Modal header={'Детали ингредиента'} onClose={onCloseModal}>
          <IngredientDetails ingredient={ingredientData} />
        </Modal>
      ) : null}
    </li>
  );
}

export default memo(IngredientCard);
