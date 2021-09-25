import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToggleModal } from "../common/modal/hooks/use_toggle_modal";
import Modal from "../common/modal/modal";
import IngredientDetailsById from "../ingredient-details-by-id/ingredient-details-by-id";

export default function IngredientDetailsModal() {
  const history = useHistory();
  const { isOpenModal, onOpenModal, onCloseModal } = useToggleModal();
  const { id } = useParams<{ id: string }>();

  const handleOnCloseModal = () => {
    onCloseModal();
    history.goBack();
  };

  useEffect(() => {
    onOpenModal();
  }, [id, onOpenModal]);

  return (
    <>
      {isOpenModal ? (
        <Modal header={"Детали ингредиента"} onClose={handleOnCloseModal}>
          <IngredientDetailsById id={id} />
        </Modal>
      ) : null}
    </>
  );
}
