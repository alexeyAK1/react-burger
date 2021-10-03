import {
  ConstructorElement,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import { ItemTypes } from "../../../../models/drag-and-drop";
import { IIngredientsItem } from "../../../../models/ingredients";
import { swapCards } from "../../../../services/constructor-ingredients-slice";
import { useDispatch } from "../../../hooks";
import styles from "./ingredient-item.module.css";

interface IProps {
  isTop?: boolean;
  isBottom?: boolean;
  image: string;
  name: string;
  price: number;
  ingredient?: IIngredientsItem;
  onDeleteItem?: (ingredient: IIngredientsItem) => void;
}

const timerAnimation = 0.2;

function IngredientItem({
  isTop = false,
  isBottom = false,
  image,
  name,
  price,
  ingredient,
  onDeleteItem,
}: IProps) {
  const type = isTop ? "top" : isBottom ? "bottom" : undefined;
  const isLocked = isTop || isBottom ? true : false;
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();
  const handleOnDelete =
    ingredient && onDeleteItem
      ? () => {
          onDeleteItem(ingredient);
        }
      : undefined;

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CONSTRUCTOR_CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IIngredientsItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragId = item.sort_id!;
      const hoverId = ingredient!.sort_id!;

      if (dragId === hoverId) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragId < hoverId && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragId > hoverId && hoverClientY > hoverMiddleY) {
        return;
      }

      if (timerIdRef.current === null) {
        dispatch(swapCards({ dragId, hoverId }));
        timerIdRef.current = setTimeout(() => {
          timerIdRef.current = null;
        }, timerAnimation * 1000);
      }
    },
  });

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CONSTRUCTOR_CARD,
    item: () => {
      return ingredient;
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  preview(drop(ref));

  return (
    <motion.div
      className={styles.ingredient_item}
      ref={ingredient ? ref : undefined}
      style={{ opacity }}
      data-handler-id={handlerId}
      transition={{ duration: timerAnimation, type: "tween" }}
      layout
    >
      <div className={styles.drag_container} ref={drag}>
        {isTop || isBottom ? null : <DragIcon type="primary" />}
      </div>
      <div className={styles.item_container}>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={`${name}${isTop ? " (верх)" : isBottom ? " (низ)" : ""}`}
          price={price}
          thumbnail={image}
          handleClose={handleOnDelete}
        />
      </div>
    </motion.div>
  );
}

export default IngredientItem;
