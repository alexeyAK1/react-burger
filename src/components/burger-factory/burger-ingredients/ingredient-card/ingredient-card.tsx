import {
  Counter,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import React, { memo, useEffect, useRef } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { Preview } from "react-dnd-multi-backend";
import { useDispatch } from "react-redux";
import { ItemTypes } from "../../../../models/drag-and-drop";
import { IIngredientsItem } from "../../../../models/ingredients";
import { setCurrentIngredient } from "../../../../services/current-ingredient-slice";
import styles from "./ingredient-card.module.css";

interface IProps {
  ingredientData: IIngredientsItem;
  count?: number;
  numElement?: number;
}

const variants: Variants = {
  visible: (i: number) => ({
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
  hidden: { opacity: 0, scaleX: 0.1, scaleY: 0.1 },
};

const variantsCount: Variants = {
  visible: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 90,
    },
  },
  addCount: {
    scale: [1.1, 1],
    transition: {
      duration: 0.5,
    },
  },
  hidden: { opacity: 0, scaleX: 0.1, scaleY: 0.1 },
  exit: {
    opacity: 0,
    scaleX: 1,
    scaleY: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

function IngredientCard({ ingredientData, count = 0, numElement = 0 }: IProps) {
  const dispatch = useDispatch();
  const countRef = useRef(0);
  const controls = useAnimation();
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.INGREDIENT_CARD,
    item: ingredientData,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    options: {
      dropEffect: "copy",
    },
  }));

  //TODO placeholder for mobile version
  const generatePreview = (props: any) => {
    const { item, style } = props;
    const newStyle = {
      ...style,
      height: "100px",
      width: "100px",
      opacity: 1,
      backgroundColor: "aqua",
    };
    console.log(item, style);
    return (
      <div style={newStyle}>
        <DragPreviewImage
          connect={preview}
          src={ingredientData.image}
          {...item}
        />
      </div>
    );
  };

  const handleOnClick = () => {
    dispatch(setCurrentIngredient(ingredientData));
  };

  useEffect(() => {
    if (
      (count > 1 && countRef.current !== 0) ||
      (count === 1 && count < countRef.current)
    ) {
      controls.start("addCount");
    } else if (count === 1 || (countRef.current === 0 && count > 0)) {
      controls.start("visible");
    } else {
      controls.start("exit");
    }
    countRef.current = count;
  }, [controls, count]);

  const opacity = isDragging ? 0.2 : 1;

  return (
    <>
      <DragPreviewImage connect={preview} src={ingredientData.image} />
      <Preview generator={generatePreview} />
      <motion.li
        className={styles.ingredient_card}
        style={{ opacity }}
        variants={variants}
        custom={numElement}
        initial="hidden"
        animate="visible"
        onClick={handleOnClick}
        ref={drag}
      >
        <AnimatePresence>
          {count ? (
            <motion.div
              className={styles.ingredient_count}
              variants={variantsCount}
              animate={controls}
              initial="hidden"
              exit="exit"
            >
              <Counter count={count} size={count < 100 ? "default" : "small"} />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <img
          className={styles.ingredient_image}
          src={ingredientData.image}
          alt={ingredientData.name}
        />
        <p className={`p-2 ${styles.ingredient_price_container}`}>
          <span className="text text_type_digits-default">
            {ingredientData.price / 100}
          </span>
          <span className={styles.ingredient_price_icon}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <p className={styles.ingredient_name}>
          <span className="text text_type_main-default">
            {ingredientData.name}
          </span>
        </p>
      </motion.li>
    </>
  );
}

export default memo(IngredientCard);
