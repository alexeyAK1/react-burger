import {
  Button,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useHistory } from "react-router-dom";
import { Api } from "../../../../api/api";
import { LOGIN_PATH } from "../../../../routes/constants-path";
import { getOrderFetch } from "../../../../services/order-slice";
import { useToggleModal } from "../../../common/modal/hooks/use_toggle_modal";
import Modal from "../../../common/modal/modal";
import { useDispatch, useSelector } from "../../../hooks";
import OrderDetails from "../../../order-details/order-details";
import styles from "./order.module.css";

const api = Api.getInstance();

export default function Order() {
  const nameButton = "Оформить заказ";
  const history = useHistory();
  const isLoading = useSelector((state) => state.order.isLoading);
  const totalSum = useSelector(
    (state) => state.constructorIngredients.totalSum
  );
  const bun = useSelector((state) => state.constructorIngredients.bun);
  const refreshToken = useSelector((state) => state.user.refreshToken);
  const dispatch = useDispatch();
  const { isOpenModal, onOpenModal, onCloseModal } = useToggleModal();
  const {
    isOpenModal: isOpenModalAlert,
    onOpenModal: onOpenModalAlert,
    onCloseModal: onCloseModalAlert,
  } = useToggleModal();

  const handleOnOpenModule = async () => {
    if (!isLoading) {
      if (refreshToken) {
        if (bun) {
          api.setAbortController();
          onOpenModal();
          await dispatch(getOrderFetch());
        } else {
          onOpenModalAlert();
        }
      } else {
        history.push(LOGIN_PATH);
      }
    }
  };

  const handleOnCloseModule = (
    e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => {
    if (isLoading) {
      api.getAbortFetch();
    }
    onCloseModal(e);
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
        <Modal onClose={handleOnCloseModule}>
          <OrderDetails />
        </Modal>
      ) : null}
      {isOpenModalAlert ? (
        <Modal onClose={onCloseModalAlert}>
          <h2 className={styles.alert}>
            {"Бургером можно наслаждаться только с булками! =)"}
          </h2>
        </Modal>
      ) : null}
    </>
  );
}
