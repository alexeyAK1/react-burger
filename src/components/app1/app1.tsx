import React, { useEffect, useState } from 'react';

import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../../styles/main.css';

import AppHeader from '../app-header/app-header';
import Header from '../../layouts/header1/header1';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import TwoColumns from '../../layouts/two-columns/two-columns';
import ErrorBoundary from '../common/error-boundary/error-boundary';
import MainAllLayouts from '../../layouts/main-all-layouts/main-alll-layouts';
import { IIngredientsItem } from '../../models/ingredients1';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Loader from '../ui1/loader1/loader1';
import ErrorMessage from '../common/error-message/error-message';
import { getIngredientData } from '../../common/agent';

function App() {
  const [data, setData] = useState<IIngredientsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getIngredient = async () => {
      setLoading(true);
      try {
        const ingredientsData = await getIngredientData();
        setData(ingredientsData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getIngredient();
  }, []);

  return (
    <div className="App">
      <ErrorBoundary>
        <Header>
          <AppHeader />
        </Header>
        <MainAllLayouts>
          {error ? (
            <ErrorMessage error={error} />
          ) : (
            <>
              <h1>Соберите бургер</h1>
              {loading ? (
                <Loader />
              ) : (
                <TwoColumns style={{ height: '100%' }}>
                  <>
                    <BurgerIngredients ingredients={data} />
                    <BurgerConstructor />
                  </>
                </TwoColumns>
              )}
            </>
          )}
        </MainAllLayouts>
      </ErrorBoundary>
    </div>
  );
}

export default App;
