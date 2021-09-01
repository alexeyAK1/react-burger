import React, { memo, useContext } from 'react';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import ScrollContainer from '../../layouts/scroll-container/scroll-container';
import IngredientItem from './ingredient-item/ingredient-item';
import Modal from '../common/modal/modal';
import OrderDetails from '../order-details/order-details';
import { useToggleModal } from './hooks/use_toggle_modal';
import { BurgerContext } from '../../services/burger-context';

function BurgerConstructor() {
  const { bun, ingredients, order, totalSum, setOrder } =
    useContext(BurgerContext)!;
  const { isOpenModal, onOpenModal, onCloseModal } = useToggleModal();

  const handleOnOpenModule = () => {
    setOrder();
    onOpenModal();
  };

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.burger_constructor_body}>
        <div className={styles.burger_top}>
          {bun ? (
            <IngredientItem
              isTop={true}
              price={bun.price / 100}
              name={bun.name}
              image={bun.image_mobile}
            />
          ) : null}
        </div>
        <div className={styles.burger_list_container}>
          <ScrollContainer className={styles.burger_list_scroll}>
            <>
              {ingredients.map((ingredient) => (
                <IngredientItem
                  price={ingredient.price / 100}
                  name={ingredient.name}
                  image={ingredient.image_mobile}
                  key={ingredient._id}
                />
              ))}
            </>
          </ScrollContainer>
        </div>
        <div className={styles.burger_bottom}>
          {bun ? (
            <IngredientItem
              isBottom={true}
              price={bun.price / 100}
              name={bun.name}
              image={bun.image_mobile}
            />
          ) : null}
        </div>
      </div>
      <div className={`pt-10 pb-10 ${styles.burger_constructor_footer}`}>
        <p className={`pr-10 ${styles.total_container}`}>
          <span className="text text_type_digits-medium">{totalSum / 100}</span>
          <span className={styles.total_icon}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <Button type="primary" size="large" onClick={handleOnOpenModule}>
          Оформить заказ
        </Button>
      </div>

      {isOpenModal && order ? (
        <Modal onClose={onCloseModal}>
          <OrderDetails />
        </Modal>
      ) : null}
    </section>
  );
}

export default memo(BurgerConstructor);
