import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../layouts/header/header";
import MainAllLayouts from "../../layouts/main-all-layouts/main-all-layouts";
import RoutesRoot from "../../routes/routes";
import { getIngredientFetch } from "../../services/ingredients-slice";
import { TRootState } from "../../services/store";
import "../../styles/main.css";
import AppHeader from "../app-header/app-header";
import ErrorBoundary from "../common/error-boundary/error-boundary";
import Loader from "../ui/loader/loader";



function App() {
  const isLoading = useSelector((state: TRootState) => state.app.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientFetch());
  }, [dispatch]);

  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <Header>
            <AppHeader />
          </Header>

          {isLoading ? (
            <MainAllLayouts>
              <Loader />
            </MainAllLayouts>
          ) : (
            <RoutesRoot />
          )}
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
