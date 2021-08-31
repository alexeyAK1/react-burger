import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';
import CategoriesSection from './categories-section/categories-section';
import IngredientCard from './ingredient-card/ingredient-card';
import ScrollContainer from '../../layouts/scroll-container/scroll-container';
import { IIngredientsItem, TCategory } from '../../models/ingredients';

const categories = { bun: 'Булки', sauce: 'Соусы', main: 'Начинки' };

interface IProps {
  ingredients?: IIngredientsItem[];
}

export default function BurgerIngredients({ ingredients = [] }: IProps) {
  const [currentType, setCurrentType] = useState<string>('bun');
  const [date, setDate] = useState<IIngredientsItem[]>([]);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDate(ingredients);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTabs = (categoryKey: TCategory) => {
    const categoryName = categories[categoryKey];

    return (
      <Tab
        value={categoryKey}
        active={currentType === categoryKey}
        onClick={setCurrentType}
        key={categoryKey}
      >
        {categoryName}
      </Tab>
    );
  };

  const getIngredients = (categoryKey: TCategory) => {
    const categoryName = categories[categoryKey];
    const filteredDate = date.filter((item) => item.type === categoryKey);

    return (
      <CategoriesSection categoryName={categoryName} key={categoryKey}>
        <ul className={`${styles.category_ingredients_container}`}>
          {filteredDate.map((filteredItem) => {
            return (
              <IngredientCard
                ingredientData={filteredItem}
                key={filteredItem._id}
                count={filteredItem._id === '60666c42cc7b410027a1a9b1' ? 1 : 0}
              />
            );
          })}
        </ul>
      </CategoriesSection>
    );
  };

  const styleIngredientsContainer = useMemo(
    () =>
      tabsRef.current
        ? {
            height: `calc(100% - ${tabsRef.current.clientHeight}px - 20px)`,
          }
        : {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tabsRef.current]
  );

  return (
    <section>
      <div className={styles.tabs_container} ref={tabsRef}>
        {(Object.keys(categories) as Array<keyof typeof categories>).map(
          getTabs
        )}
      </div>
      <ScrollContainer style={styleIngredientsContainer}>
        <>
          {(Object.keys(categories) as Array<keyof typeof categories>).map(
            getIngredients
          )}
        </>
      </ScrollContainer>
    </section>
  );
}
