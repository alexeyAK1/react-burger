import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { getOrderData } from '../../../../api/agent';
import { getNElementArr } from '../../../../common/functions';
import { setOrder } from '../../../../redux/order-slice';
import { RootState } from '../../../../redux/store';
import { useToggleModal } from '../../../common/modal/hooks/use_toggle_modal';
import Modal from '../../../common/modal/modal';
import OrderDetails from '../../../order-details/order-details';

import styles from './order.module.css';

export default function Order() {
  const { bun, constructorIngredients, order, totalSum } = useSelector(
    (state: RootState) => ({
      bun: state.constructorIngredients.bun,
      constructorIngredients:
        state.constructorIngredients.constructorIngredients,
      order: state.order.order,
      totalSum: state.constructorIngredients.totalSum,
    })
  );
  const dispatch = useDispatch();
  const { isOpenModal, onOpenModal, onCloseModal } = useToggleModal();
  const handleOnOpenModule = async () => {
    const getIngredientIds = () =>
      constructorIngredients.map((item) => item._id);

    const ingredients = [...getIngredientIds(), ...getNElementArr(2, bun?._id)];

    try {
      const orderData = await getOrderData(ingredients);

      dispatch(setOrder(orderData));
    } catch (error) {
      console.log(error);
    }

    onOpenModal();
  };

  return (
    <>
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
    </>
  );
}
