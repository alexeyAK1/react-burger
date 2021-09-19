import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import MainAllLayouts from "../../layouts/main-all-layouts/main-all-layouts";
import { IIngredientsItem } from "../../models/ingredients";
import { RootState } from "../../services/store";
import styles from "./ingredient-page.module.css";

export default function IngredientPage() {
  const { id: ingredientId } = useParams<{ id: string }>();
  const [currentIngredient, setCurrentIngredient] =
    useState<IIngredientsItem | null>();
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  useEffect(() => {
    const findIngredients = ingredients.find(
      (item) => item._id === ingredientId
    );

    if (findIngredients) setCurrentIngredient(findIngredients);
  }, [ingredientId, ingredients]);

  return (
    <MainAllLayouts>
      {currentIngredient ? (
        <div className={styles.ingredient_page_container}>
          <h2
            className={`text text_type_main-large ${styles.ingredient_page_container_header}`}
          >
            Детали ингредиента
          </h2>
          <IngredientDetails ingredient={currentIngredient} />
        </div>
      ) : (
        <div />
      )}
    </MainAllLayouts>
  );
}
