import React from "react";
import { useParams } from "react-router-dom";
import IngredientDetailsById from "../../components/ingredient-details-by-id/ingredient-details-by-id";
import MainAllLayouts from "../../layouts/main-all-layouts/main-all-layouts";
import styles from "./ingredient-page.module.css";


export default function IngredientPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <MainAllLayouts>
      <div className={styles.ingredient_page_container}>
        <h2
          className={`text text_type_main-large ${styles.ingredient_page_container_header}`}
        >
          Детали ингредиента
        </h2>
        <IngredientDetailsById id={id} />
      </div>
    </MainAllLayouts>
  );
}
