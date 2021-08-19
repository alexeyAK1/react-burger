import React, { ReactChild, MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalHeader from './ModalHeader/ModalHeader';
import ModalOverlay from './ModalOverlay/ModalOverlay';

import styles from './Modal.module.css';

const modalRoot = document.getElementById('react-modals');

interface IProps {
  children: ReactChild;
  header?: string;
  onClose: (e?: MouseEvent<HTMLElement>) => void;
}

export default function Modal({ children, header, onClose }: IProps) {
  const onKeyDown = (e: KeyboardEvent) => {
    //закрытие окна по escape
    if (e.which === 27) {
      e.preventDefault();
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={onClose}>
        <div className={`p-10 pb-15 ${styles.modal}`}>
          <ModalHeader onClose={onClose}>{header}</ModalHeader>
          <div className={styles.modal_body}>{children}</div>
        </div>
      </ModalOverlay>
    </>,
    modalRoot!
  );
}
