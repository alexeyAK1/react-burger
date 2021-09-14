import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../../styles/main.css';

import AppHeader from '../app-header/app-header';
import Header from '../../layouts/header/header';
import ErrorBoundary from '../common/error-boundary/error-boundary';
import MainAllLayouts from '../../layouts/main-all-layouts/main-all-layouts';
import ErrorMessage from '../common/error-message/error-message';
import { RootState } from '../../services/store';
import Loader from '../ui/loader/loader';
import { getIngredientFetch } from '../../services/ingredients-slice';
import RoutesRoot from '../../routes/routes';

function App() {
  const error = useSelector((state: RootState) => state.app.error);
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientFetch());
  }, [dispatch]);

  return (
    <div className="App">
      <ErrorBoundary>
        <Header>
          <AppHeader />
        </Header>

        {error ? (
          <MainAllLayouts>
            <ErrorMessage error={error} />
          </MainAllLayouts>
        ) : isLoading ? (
          <MainAllLayouts>
            <Loader />
          </MainAllLayouts>
        ) : (
          <RoutesRoot />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
