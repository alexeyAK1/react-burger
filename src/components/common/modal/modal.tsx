import React, { ReactChild, MouseEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import "animate.css";

import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";

import styles from "./modal.module.css";
import { useAnimateModal } from "./hooks/use_animate_modal";

const modalRoot = document.getElementById("react-modals");

interface IProps {
  children: ReactChild;
  header?: string;
  isAnimated?: boolean;
  animateClassIn?: string;
  animateClassOut?: string;
  animateTime?: number;
  onClose: (e?: MouseEvent<HTMLElement>) => void;
}

export default function Modal({
  children,
  header,
  isAnimated = true,
  animateClassIn = "animate__fadeInUp",
  animateClassOut = " animate__fadeOutDown",
  animateTime = 1000,
  onClose,
}: IProps) {
  const { isAnimate, isCloseAnimate, getCloseAnimation } = useAnimateModal(
    isAnimated,
    animateTime
  );
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleOnClose();
    }
  };

  const handleOnClose = (
    e?: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    getCloseAnimation(() => {
      onClose(e);
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={handleOnClose} isAnimate={isAnimate}>
        <div
          className={`p-10 pb-15 ${styles.modal} animate__animated ${
            isCloseAnimate ? animateClassOut : animateClassIn
          }`}
        >
          <ModalHeader onClose={handleOnClose}>{header}</ModalHeader>
          <div className={styles.modal_body}>{children}</div>
        </div>
      </ModalOverlay>
    </>,
    modalRoot!
  );
}
