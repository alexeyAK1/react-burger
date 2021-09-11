import { useEffect, useState } from "react";

export const useAnimateModal = (isAnimated: boolean, animateTime: number) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const [isCloseAnimate, setIsCloseAnimate] = useState(false);
  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    if (isAnimated) {
      setIsAnimate(true);

      const timeout = window.setTimeout(() => {
        setIsAnimate(false);
      }, animateTime);

      setTimerId(timeout);

      return () => {
        clearTimeout(timerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCloseAnimation = (callBack: () => void) => {
    if (!isCloseAnimate && isAnimated) {
      setIsCloseAnimate(true);
      setIsAnimate(true);
      clearTimeout(timerId);

      const timeout = window.setTimeout(callBack, animateTime);

      setTimerId(timeout);
    }
  };

  return { isAnimate, isCloseAnimate, getCloseAnimation };
};
