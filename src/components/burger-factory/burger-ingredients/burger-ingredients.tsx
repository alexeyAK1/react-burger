import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ScrollContainer from '../../../layouts/scroll-container/scroll-container';
import TabNavByCategory from './tab-nav-by-category/tab-nav-by-category';
import { TCategory } from '../../../models/ingredients';
import { RootState } from '../../../services/store';
import { useForceMemoUpdate } from './hooks/use-force-memo-update';
import { useToggleRefs } from './hooks/use-toggle-refs';
import { useToggleModal } from '../../common/modal/hooks/use_toggle_modal';
import Modal from '../../common/modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import IngredientsList from './ingredients-list/ingredients-list';
import { setCurrentIngredient } from '../../../services/current-ingredient-slice';
import { bunName, categoriesTypeArray } from '../../../common/constants';

export default function BurgerIngredients() {
  const dispatch = useDispatch();
  const tabsRef = useRef<HTMLDivElement>(null);
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );
  const bun = useSelector(
    (state: RootState) => state.constructorIngredients.bun
  );
  const countIngredients = useSelector(
    (state: RootState) => state.ingredients.countIngredients
  );
  const currentIngredient = useSelector(
    (state: RootState) => state.currentIngredient.currentIngredient
  );
  const [visibleList, setVisibleList] = useState<TCategory[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const { isOpenModal, onOpenModal, onCloseModal } = useToggleModal();
  const forceMemoUpdate = useForceMemoUpdate([ingredients]);
  const { currentTabName, tabListRefs, setCurrentType } =
    useToggleRefs(bunName);

  useEffect(() => {
    const findTabName = (name: TCategory) =>
      visibleList.find((nameList) => name === nameList);
    const newTab = categoriesTypeArray.find(findTabName) as TCategory;

    setCurrentType(newTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleList]);

  useEffect(() => {
    if (currentIngredient) {
      onOpenModal();
    }
  }, [currentIngredient, onOpenModal]);

  const handleOnCloseModal = () => {
    onCloseModal();

    dispatch(setCurrentIngredient(null));
  };

  const handleOnClickTab = useCallback(
    (value: string) => {
      setCurrentType(value as TCategory);
    },
    [setCurrentType]
  );

  const handleOnChangeInView = useCallback(
    (inView: boolean, entry: IntersectionObserverEntry) => {
      const inViewName = entry.target.getAttribute('name') as TCategory;

      if (inView) {
        setVisibleList([...visibleList, inViewName]);
      } else {
        const newList = visibleList.filter((item) => item !== inViewName);
        setVisibleList([...newList]);
      }
    },
    [visibleList]
  );

  const handleOnMouseEnter = useCallback(() => {
    setIsClicked(true);
  }, []);

  const handleOnMouseLeave = useCallback(() => {
    setIsClicked(false);
  }, []);

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
      <TabNavByCategory
        tabsRef={tabsRef}
        currentTabName={currentTabName}
        onClickTab={handleOnClickTab}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <ScrollContainer
        style={styleIngredientsContainer}
        forceUpdate={forceMemoUpdate}
      >
        <IngredientsList
          tabListRefs={tabListRefs}
          ingredients={ingredients}
          countIngredients={countIngredients}
          isClicked={isClicked}
          bun={bun}
          onChangeInView={handleOnChangeInView}
        />
      </ScrollContainer>
      {isOpenModal ? (
        <Modal header={'Детали ингредиента'} onClose={handleOnCloseModal}>
          <IngredientDetails ingredient={currentIngredient!} />
        </Modal>
      ) : null}
    </section>
  );
}
