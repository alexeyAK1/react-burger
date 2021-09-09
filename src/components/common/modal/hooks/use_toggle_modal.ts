import { useCallback, useState, MouseEvent } from "react";

export const useToggleModal = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const onCloseModal = useCallback((e?: MouseEvent<HTMLElement>) => {
        if (e) {
          e.stopPropagation();
        }

        setIsOpenModal(false);
      }, []);

      const onOpenModal = useCallback(() => {
        setIsOpenModal(true);
      }, []);

      return {isOpenModal, onCloseModal, onOpenModal}
}