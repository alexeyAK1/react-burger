import React, { memo, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import ScrollContainer from '../../../layouts/scroll-container/scroll-container';
import { ItemTypes } from '../../../models/drag-and-drop';
import { IIngredientsItem } from '../../../models/ingredients';
import {
  addIngredientInConstructor,
  deleteIngredientFromConstructor
} from '../../../services/constructor-ingredients-slice';
import { TRootState } from '../../../services/store';
import Bun from './bun/bun';
import styles from './burger-constructor.module.css';
import ConstructorIngredientsList from './constructor-ingredients-list/constructor-ingredients-list';
import Order from './order/order';


function BurgerConstructor() {
  const { bun, constructorIngredients } = useSelector((state: TRootState) => ({
    bun: state.constructorIngredients.bun,
    constructorIngredients: state.constructorIngredients.constructorIngredients,
  }));
  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.INGREDIENT_CARD,
    drop: (item) => {
      dispatch(addIngredientInConstructor(item as IIngredientsItem));
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }));

  const handleDeleteItem = useCallback(
    (ingredient: IIngredientsItem) => {
      dispatch(deleteIngredientFromConstructor(ingredient));
    },
    [dispatch]
  );

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.burger_constructor_body}>
        <Bun bun={bun} isTop={true} />
        <div
          className={`${styles.burger_list_container} ${
            canDrop ? styles.burger_list_container_target_illumination : ''
          } ${isOver ? styles.burger_list_container_over_illumination : ''}`}
          ref={drop}
        >
          <ScrollContainer className={styles.burger_list_scroll}>
            <ConstructorIngredientsList
              constructorIngredients={constructorIngredients}
              deleteItem={handleDeleteItem}
            />
          </ScrollContainer>
        </div>
        <Bun bun={bun} isTop={false} />
      </div>
      <Order />
    </section>
  );
}

export default memo(BurgerConstructor);
