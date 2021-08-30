import React, { useEffect, useState } from 'react';

import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../../styles/main.css';

import AppHeader from '../app-header/app-header';
import Header from '../../layouts/header/header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import TwoColumns from '../../layouts/two-columns/two-columns';
import ErrorBoundary from '../common/error-boundary/error-boundary';
import MainAllLayouts from '../../layouts/main-all-layouts/main-alll-layouts';
import { IIngredientsItem } from '../../models/ingredients';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { ingredientsUrl } from '../../common/constants';
import Loader from '../UI/loader/loader';
import ErrorMessage from '../common/error-message/error-message';

function App() {
  const [data, setData] = useState<IIngredientsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getIngredientData = async () => {
      setLoading(true);
      try {
        const res = await fetch(ingredientsUrl);
        const fetchData = await res.json();

        setData(fetchData.data as IIngredientsItem[]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getIngredientData();
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
