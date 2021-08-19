import React, { MouseEvent, ReactChild } from 'react';

import styles from './ModalOverlay.module.css';

interface IProps {
  children: ReactChild;
  onClose?: (e: MouseEvent<HTMLElement>) => void;
}

export default function ModalOverlay({ children, onClose = () => {} }: IProps) {
  const dataType = 'modal';

  const onClick = (e: MouseEvent<HTMLElement>): void => {
    const target = e.target as Element;

    if (target.getAttribute('data-type') === dataType) {
      onClose(e);
    }
  };

  return (
    <div
      className={styles.modal_overlay}
      onClick={onClick}
      data-type={dataType}
    >
      {children}
    </div>
  );
}
