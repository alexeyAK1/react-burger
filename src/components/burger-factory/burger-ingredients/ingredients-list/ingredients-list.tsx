import React, { memo, MutableRefObject, useCallback } from 'react';
import InView from 'react-intersection-observer';

import {
  bunName,
  categories,
  categoriesTypeArray,
} from '../../../../common/constants';
import {
  ICountIngredient,
  IIngredientsItem,
  TCategory,
} from '../../../../models/ingredients';
import CategoriesSection from '../categories-section/categories-section';
import IngredientCard from '../ingredient-card/ingredient-card';

import styles from './ingredients-list.module.css';

interface IProps {
  tabListRefs: MutableRefObject<{
    bun?: HTMLDivElement | null | undefined;
    sauce?: HTMLDivElement | null | undefined;
    main?: HTMLDivElement | null | undefined;
  }>;
  ingredients: IIngredientsItem[];
  countIngredients: ICountIngredient[];
  isClicked: boolean;
  bun: IIngredientsItem | null;
  onChangeInView: (inView: boolean, entry: IntersectionObserverEntry) => void;
}

function IngredientsList({
  tabListRefs,
  ingredients,
  countIngredients,
  isClicked,
  bun,
  onChangeInView,
}: IProps) {
let numElement = 0;

  const getCount = useCallback(
    (item: IIngredientsItem) => {
      if (item.type === bunName) {
        return bun && bun!._id === item._id ? 2 : 0;
      } else {
        const findCountObj = countIngredients.find(
          (countObj) => countObj.id === item._id
        );

        return findCountObj ? findCountObj.count : 0;
      }
    },
    [bun, countIngredients]
  );

  return (
    <>
      {categoriesTypeArray.map((categoryKey: TCategory) => {
        const categoryName = categories[categoryKey];
        const filteredDate = ingredients.filter(
          (item) => item.type === categoryKey
        );

        return (
          <CategoriesSection
            categoryName={categoryName}
            key={categoryKey}
            currentTabRef={(node) => (tabListRefs.current[categoryKey] = node)}
          >
            <InView
              as="div"
              name={categoryKey}
              // threshold={0.6}
              skip={isClicked}
              onChange={onChangeInView}
            >
              <ul className={`${styles.category_ingredients_container}`}>
                {filteredDate.map((filteredItem) => {
                  numElement++;

                  return (
                    <IngredientCard
                      ingredientData={filteredItem}
                      key={filteredItem._id}
                      count={getCount(filteredItem)}
                      numElement={numElement}
                    />
                  );
                })}
              </ul>
            </InView>
          </CategoriesSection>
        );
      })}
    </>
  );
}

export default memo(IngredientsList);
