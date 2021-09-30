import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { MouseEvent, ReactChild } from "react";
import styles from "./modal-header.module.css";


interface IProps {
  children?: ReactChild;
  className?: string;
  onClose: (e: MouseEvent<HTMLElement>) => void;
}

export default function ModalHeader({
  children,
  className = "",
  onClose,
}: IProps) {
  return (
    <div className={styles.modal_header}>
      <div
        className={`text text_type_main-large ${styles.modal_header_content} ${className}`}
      >
        {children ? children : ""}
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
