import React, { useEffect, useState } from "react";
import { IIngredientsItem } from "../../models/ingredients";
import { useSelector } from "../hooks";
import IngredientDetails from "../ingredient-details/ingredient-details";

interface IProps {
  id: string;
}

export default function IngredientDetailsById({ id }: IProps) {
  const [currentIngredient, setCurrentIngredient] =
    useState<IIngredientsItem | null>();
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    const findIngredients = ingredients.find((item) => item._id === id);

    if (findIngredients) setCurrentIngredient(findIngredients);
  }, [id, ingredients]);

  return currentIngredient ? (
    <IngredientDetails ingredient={currentIngredient} />
  ) : (
    <div />
  );
}
