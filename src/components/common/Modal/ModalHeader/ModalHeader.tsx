import React, { ReactChild, MouseEvent } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ModalHeader.module.css';

interface IProps {
  children?: ReactChild;
  onClose: (e: MouseEvent<HTMLElement>) => void;
}

export default function ModalHeader({ children, onClose }: IProps) {
  return (
    <div className={styles.modal_header}>
      <div
        className={`text text_type_main-large ${styles.modal_header_content}`}
      >
        {children ? children : ''}
      </div>
      <div
        className={`p-2 ${styles.modal_header_close_button}`}
        onClick={onClose}
      >
        <CloseIcon type="primary" />
      </div>
    </div>
  );
}
