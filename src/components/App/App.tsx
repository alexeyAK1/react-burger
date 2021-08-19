import React, { useEffect, useState } from 'react';

import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../../styles/main.css';

import AppHeader from '../AppHeader/AppHeader';
import Header from '../../layouts/Header/Header';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import TwoColumns from '../../layouts/TwoColumns/TwoColumns';
import ErrorBoundary from '../common/ErrorBoundary/ErrorBoundary';
import MainAllLayouts from '../../layouts/MainAllLayouts/MainAllLayouts';
import { IIngredientsItem } from '../../models/ingredients';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { ingredientsUrl } from '../../common/constants';
import Loader from '../common/Loader/Loader';
import ErrorMessage from '../common/ErrorMessage/ErrorMessage';

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
