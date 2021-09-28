import React, {
  FC,
  JSXElementConstructor,
  ReactElement,
  useEffect
} from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToggleModal } from "../common/modal/hooks/use_toggle_modal";
import Modal from "../common/modal/modal";

interface IProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  title?: string;
}

const DetailsModal: FC<IProps> = ({ children, title }) => {
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
        <Modal
          header={title ? title : `#${id}`}
          classNameHeader={title ? "" : "text text_type_digits-default"}
          onClose={handleOnCloseModal}
        >
          {React.cloneElement(children, { id })}
        </Modal>
      ) : null}
    </>
  );
};

export default DetailsModal;
