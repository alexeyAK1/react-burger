import "animate.css";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { MouseEvent, ReactChild, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalHeader from "./modal-header/modal-header";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";



const modalRoot = document.getElementById("react-modals");

interface IProps {
  children: ReactChild;
  header?: string;
  classNameHeader?: string;
  isAnimated?: boolean;
  animateClassIn?: string;
  animateClassOut?: string;
  animateTime?: number;
  onClose: (e?: MouseEvent<HTMLElement>) => void;
}

const variants = {
  visible: { y: 0, scaleX: 1 },
  hidden: { y: "100vh", scaleX: 0.1 },
};

export default function Modal({
  children,
  header,
  classNameHeader = "",
  isAnimated = true,
  animateTime = 0.5,
  onClose,
}: IProps) {
  const [timerId, setTimerId] = useState(0);
  const [isEndAnimate, setIsEndAnimate] = useState(false);
  const [isAnimationGoingOn, setIsAnimationGoingOn] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleOnClose();
    }
  };

  const handleOnClose = (
    e?: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    setIsAnimationGoingOn(true);
    setIsEndAnimate(true);

    const timeout = window.setTimeout(() => {
      onClose(e);
    }, animateTime * 1000);

    setTimerId(timeout);
  };

  useEffect(() => {
    const goAnimate = async () => {
      setIsAnimationGoingOn(true);
      await controls.start("visible");
      setIsAnimationGoingOn(false);
    };

    window.addEventListener("keydown", onKeyDown);
    goAnimate();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={handleOnClose} isAnimate={isAnimationGoingOn}>
        <AnimatePresence>
          {!isEndAnimate && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate={controls}
              exit="hidden"
              transition={{
                duration: animateTime,
                type: "spring",
                stiffness: 80,
              }}
              className={`p-10 pb-15 ${styles.modal}`}
            >
              <ModalHeader onClose={handleOnClose} className={classNameHeader}>
                {header}
              </ModalHeader>
              <div className={styles.modal_body}>{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalOverlay>
    </>,
    modalRoot!
  );
}
