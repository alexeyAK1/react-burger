import React from 'react';

import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '../../styles/main.css';

import AppHeader from '../AppHeader/AppHeader';
import Header from '../../layouts/Header/Header';
import Main from '../../layouts/Main/Main';
import MainIndent from '../../layouts/MainIndent/MainIndent';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import TwoColumns from '../../layouts/TwoColumns/TwoColumns';
import MainMaximumHeight from '../../layouts/MainMaximumHeight/MainMaximumHeight';

function App() {
  return (
    <div className="App">
      <Header>
        <AppHeader />
      </Header>
      <Main>
        <MainIndent>
          <MainMaximumHeight>
            <>
              <h1>Соберите бургер</h1>
              <TwoColumns style={{ height: '100%' }}>
                <>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </>
              </TwoColumns>
            </>
          </MainMaximumHeight>
        </MainIndent>
      </Main>
    </div>
  );
}

export default App;
