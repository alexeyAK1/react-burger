import React, { memo, RefObject } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { categories, categoriesTypeArray } from '../../../common/constants';
import { TCategory } from '../../../models/ingredients';

import styles from './tab-nav-by-category.module.css';

interface IProps {
  currentTabName: TCategory;
  tabsRef: RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClickTab: (value: string) => void;
}

function TabNavByCategory({
  currentTabName,
  tabsRef,
  onMouseEnter,
  onMouseLeave,
  onClickTab,
}: IProps) {
  return (
    <nav
      className={styles.tabs_container}
      ref={tabsRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {categoriesTypeArray.map((categoryKey: TCategory) => {
        const categoryName = categories[categoryKey];

        return (
          <Tab
            value={categoryKey}
            active={currentTabName === categoryKey}
            onClick={onClickTab}
            key={categoryKey}
          >
            {categoryName}
          </Tab>
        );
      })}
    </nav>
  );
}

export default memo(TabNavByCategory);
