import React, { memo, useCallback } from 'react';
import { IIngredientsItem } from '../../../../models/ingredients';
import IngredientItem from '../ingredient-item/ingredient-item';

interface IProps {
  constructorIngredients: IIngredientsItem[];
  deleteItem: (ingredient: IIngredientsItem) => void;
}

function ConstructorIngredientsList({
  constructorIngredients,
  deleteItem,
}: IProps) {
  const handleDeleteItem = useCallback(
    (ingredient: IIngredientsItem) => {
      deleteItem(ingredient);
    },
    [deleteItem]
  );
  return (
    <>
      {constructorIngredients.map((ingredient) => (
        <IngredientItem
          price={ingredient.price / 100}
          name={ingredient.name}
          image={ingredient.image_mobile}
          key={ingredient.sort_id}
          ingredient={ingredient}
          onDeleteItem={handleDeleteItem}
        />
      ))}
    </>
  );
}

export default memo(ConstructorIngredientsList);
