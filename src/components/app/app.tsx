import React, { useContext, useEffect, useState } from 'react';

import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../../styles/main.css';

import AppHeader from '../app-header/app-header';
import Header from '../../layouts/header/header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import TwoColumns from '../../layouts/two-columns/two-columns';
import ErrorBoundary from '../common/error-boundary/error-boundary';
import MainAllLayouts from '../../layouts/main-all-layouts/main-all-layouts';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Loader from '../ui/loader/loader';
import ErrorMessage from '../common/error-message/error-message';
import { BurgerContext } from '../../services/burger-context';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { setIngredients } = useContext(BurgerContext)!;

  useEffect(() => {
    const resolve = () => setLoading(false);
    const reject = () => {
      setError(error);
      setLoading(false);
    };

    setLoading(true);
    setIngredients(resolve, reject);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <BurgerIngredients />
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
