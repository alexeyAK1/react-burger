import React, { MouseEvent } from 'react';

import styles from './ModalOverlay.module.css';

interface IProps {
  onClose?: (e: MouseEvent<HTMLElement>) => void;
}

export default function ModalOverlay({ onClose = () => {} }: IProps) {
  return <div className={styles.modal_overlay} onClick={onClose} />;
}
