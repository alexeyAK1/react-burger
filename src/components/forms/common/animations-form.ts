import { Variants } from "framer-motion";

const timeAnimation = 0.6;
export const variantsNextRouter: Variants = {
  visible: {
    opacity: 1,
    transition: {
      duration: timeAnimation,
    },
  },
  hidden: { opacity: 0 },
  exit: {
    opacity: 0,
  },
};
export const variantsProfileButton: Variants = {
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.5,
    },
  }),
  hidden: { opacity: 0, x: -100 },
};
