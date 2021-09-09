import React from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import TwoColumns from '../../layouts/two-columns/two-columns';
import { RootState } from '../../services/store';
import Loader from '../ui/loader/loader';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';

export default function BurgerFactory() {
  const isLoading = useSelector(
    (state: RootState) => state.ingredients.isLoading
  );
  const title = 'Соберите бургер';

  return (
    <>
      <h1>{title}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <TwoColumns style={{ height: '100%' }}>
          <DndProvider backend={HTML5Backend}>
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          </DndProvider>
        </TwoColumns>
      )}
    </>
  );
}
