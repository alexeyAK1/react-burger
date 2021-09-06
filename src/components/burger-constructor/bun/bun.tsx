import React from 'react';

import { IIngredientsItem } from '../../../models/ingredients';
import IngredientItem from '../ingredient-item/ingredient-item';

interface IProps {
  bun: IIngredientsItem | null;
  isTop: boolean;
}

export default function Bun({ bun, isTop }: IProps) {
  return (
    <div>
      {bun ? (
        <IngredientItem
          isTop={isTop}
          price={bun.price / 100}
          name={bun.name}
          image={bun.image_mobile}
        />
      ) : null}
    </div>
  );
}
