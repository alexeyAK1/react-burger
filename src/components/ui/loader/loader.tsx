import { AnimatePresence, motion, Variants } from "framer-motion";
import React from "react";

import styles from "./loader.module.css";

const variantsLoader1: Variants = {
  visible: {
    opacity: 1,
    x: [-20, 20, -20],
    y: [0, -30, 0],
    transition: {
      x: {
        repeat: Infinity,
        duration: 1,
      },
      y: {
        repeat: Infinity,
        duration: 0.5,
      },
    },
  },
  hidden: { opacity: 0 },
};
const variantsLoader2: Variants = {
  visible: {
    opacity: 1,
    x: [20, -20, 20],
    y: [0, 30, 0],
    transition: {
      x: {
        repeat: Infinity,
        duration: 1,
      },
      y: {
        repeat: Infinity,
        duration: 0.5,
      },
    },
  },
  hidden: { opacity: 0 },
};
const variantsContainer: Variants = {
  visible: {
    rotate: [0, 360],
    transition: {
      rotate: {
        repeat: Infinity,
        duration: 3,
      },
    },
  },
};
const variantsLoader3: Variants = {
  visible: {
    opacity: 1,
    z: [-20, 20, -20],
    y: [-30, 30, -30],
    x: [20, -20, 20],
    scale: [1, 1.5, 1, 0.5, 1],
    transition: {
      x: {
        repeat: Infinity,
        duration: 1,
      },
      y: {
        repeat: Infinity,
        duration: 1,
      },
      z: {
        repeat: Infinity,
        duration: 0.5,
      },
      scale: {
        repeat: Infinity,
        duration: 0.5,
      },
    },
  },
  hidden: { opacity: 0 },
};
const variantsLoader4: Variants = {
  visible: {
    opacity: 1,
    z: [20, -20, 20],
    y: [20, -20, 20],
    x: [-20, 20, -20],
    scale: [1, 0.5, 1, 1.5, 1],
    transition: {
      x: {
        repeat: Infinity,
        duration: 1,
      },
      y: {
        repeat: Infinity,
        duration: 1,
      },
      z: {
        repeat: Infinity,
        duration: 0.5,
      },
      scale: {
        repeat: Infinity,
        duration: 0.5,
      },
    },
  },
  hidden: { opacity: 0 },
};

export default function Loader() {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.loader_container}
        variants={variantsContainer}
        animate={"visible"}
      >
        <motion.div
          key="1"
          variants={variantsLoader1}
          initial="hidden"
          exit="hidden"
          animate="visible"
          className={styles.loader1}
        />
        <motion.div
          key="2"
          variants={variantsLoader2}
          initial="hidden"
          exit="hidden"
          animate="visible"
          className={styles.loader2}
        />
        <motion.div
          key="3"
          variants={variantsLoader3}
          initial="hidden"
          exit="hidden"
          animate="visible"
          className={styles.loader3}
        />
        <motion.div
          key="4"
          variants={variantsLoader4}
          initial="hidden"
          exit="hidden"
          animate="visible"
          className={styles.loader4}
        />
      </motion.div>
    </AnimatePresence>
  );
}
