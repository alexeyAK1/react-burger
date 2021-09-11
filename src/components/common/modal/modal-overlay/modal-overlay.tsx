import React, { MouseEvent, ReactChild } from "react";

import styles from "./modal-overlay.module.css";

interface IProps {
  children: ReactChild;
  isAnimate?: boolean;
  onClose?: (e: MouseEvent<HTMLElement>) => void;
}

export default function ModalOverlay({
  children,
  onClose = () => {},
  isAnimate = false,
}: IProps) {
  const dataType = "modal";

  const onClick = (e: MouseEvent<HTMLElement>): void => {
    const target = e.target as Element;

    if (target.getAttribute("data-type") === dataType) {
      onClose(e);
    }
  };

  return (
    <div
      className={`${styles.modal_overlay} ${
        isAnimate ? styles.modal_overlay_animate : ""
      }`}
      onClick={onClick}
      data-type={dataType}
    >
      {children}
    </div>
  );
}
