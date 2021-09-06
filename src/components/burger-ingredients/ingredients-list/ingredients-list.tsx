import React, { memo, MutableRefObject, useCallback } from 'react';
import InView from 'react-intersection-observer';

import { categories, categoriesTypeArray } from '../../../common/constants';
import {
  ICountIngredient,
  IIngredientsItem,
  TCategory,
} from '../../../models/ingredients';
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
  onChangeInView: (inView: boolean, entry: IntersectionObserverEntry) => void;
}

function IngredientsList({
  tabListRefs,
  ingredients,
  countIngredients,
  isClicked,
  onChangeInView,
}: IProps) {
  const getCount = useCallback(
    (item: IIngredientsItem) => {
      const findCountObj = countIngredients.find(
        (countObj) => countObj.id === item._id
      );

      return findCountObj ? findCountObj.count : 0;
    },
    [countIngredients]
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
                  return (
                    <IngredientCard
                      ingredientData={filteredItem}
                      key={filteredItem._id}
                      count={getCount(filteredItem)}
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
