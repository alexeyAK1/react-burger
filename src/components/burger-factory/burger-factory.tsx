import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import TwoColumns from '../../layouts/two-columns/two-columns';
import { RootState } from '../../redux/store';
import Loader from '../ui/loader/loader';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';
import {
  setIngredients,
  setIngredientsLoading,
} from '../../redux/ingredients-slice';
import { setAppError } from '../../redux/app-slice';
import { getIngredientData } from '../../api/agent';
import { bunName } from '../../common/constants';
import { setBun } from '../../redux/constructor-ingredients-slice';

export default function BurgerFactory() {
  const isLoading = useSelector(
    (state: RootState) => state.ingredients.isLoading
  );
  const title = 'Соберите бургер';
  const dispatch = useDispatch();

  useEffect(() => {
    const setLoading = (isLoading: boolean) =>
      dispatch(setIngredientsLoading(isLoading));
    const setError = (error: Error | null) => dispatch(setAppError(error));
    const getIngredient = async () => {
      setLoading(true);

      try {
        const ingredientsData = await getIngredientData();
        const firstBunElement = ingredientsData.filter(
          (item) => item.type === bunName
        )[0];

        dispatch(setBun(firstBunElement));
        dispatch(setIngredients(ingredientsData));

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getIngredient();
  }, [dispatch]);

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
