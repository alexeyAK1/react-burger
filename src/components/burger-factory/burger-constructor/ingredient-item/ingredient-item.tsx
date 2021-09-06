import React, { memo, useRef } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient-item.module.css';
import { IIngredientsItem } from '../../../../models/ingredients';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { ItemTypes } from '../../../../models/drag-and-drop';
import { useDispatch } from 'react-redux';
import { swapCards } from '../../../../redux/constructor-ingredients-slice';

interface IProps {
  isTop?: boolean;
  isBottom?: boolean;
  image: string;
  name: string;
  price: number;
  ingredient?: IIngredientsItem;
  onDeleteItem?: (ingredient: IIngredientsItem) => void;
}

function IngredientItem({
  isTop = false,
  isBottom = false,
  image,
  name,
  price,
  ingredient,
  onDeleteItem,
}: IProps) {
  const type = isTop ? 'top' : isBottom ? 'bottom' : undefined;
  const isLocked = isTop || isBottom ? true : false;
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

      dispatch(swapCards({ dragId, hoverId }));
    },
  });

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
    <div
      className={styles.ingredient_item}
      ref={ingredient ? ref : undefined}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <div className={styles.drag_container} ref={drag}>
        {isTop || isBottom ? null : <DragIcon type="primary" />}
      </div>
      <div className={styles.item_container}>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={`${name}${isTop ? ' (верх)' : isBottom ? ' (низ)' : ''}`}
          price={price}
          thumbnail={image}
          handleClose={handleOnDelete}
        />
      </div>
    </div>
  );
}

export default memo(IngredientItem);
