import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { getOrderFetch } from '../../../../services/order-slice';
import { RootState } from '../../../../services/store';
import { useToggleModal } from '../../../common/modal/hooks/use_toggle_modal';
import Modal from '../../../common/modal/modal';
import OrderDetails from '../../../order-details/order-details';

import styles from './order.module.css';

export default function Order() {
  const nameButton = 'Оформить заказ';
  const totalSum = useSelector(
    (state: RootState) => state.constructorIngredients.totalSum
  );
  const bun = useSelector(
    (state: RootState) => state.constructorIngredients.bun
  );
  const dispatch = useDispatch();
  const { isOpenModal, onOpenModal, onCloseModal } = useToggleModal();
  const { isOpenModal: isOpenModalAlert, onOpenModal: onOpenModalAlert, onCloseModal: onCloseModalAlert } = useToggleModal();

  const handleOnOpenModule = async () => {
    if (bun) {
      dispatch(getOrderFetch());
      onOpenModal();
    } else {
      onOpenModalAlert();
    }
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
          {nameButton}
        </Button>
      </div>

      {isOpenModal ? (
        <Modal onClose={onCloseModal}>
          <OrderDetails />
        </Modal>
      ) : null}
      {isOpenModalAlert ? (
        <Modal onClose={onCloseModalAlert}>
          <h2 className={styles.alert}>{"Бургером можно наслаждаться только с булками! =)"}</h2>
        </Modal>
      ) : null}
    </>
  );
}
