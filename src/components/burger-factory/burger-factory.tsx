import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import TwoColumns from "../../layouts/two-columns/two-columns";
import { TRootState } from "../../services/store";
import Loader from "../ui/loader/loader";
import BurgerConstructor from "./burger-constructor/burger-constructor";
import BurgerIngredients from "./burger-ingredients/burger-ingredients";

export default function BurgerFactory() {
  const isLoading = useSelector(
    (state: TRootState) => state.ingredients.isLoading
  );
  const title = "Соберите бургер";

  return (
    <>
      <h1>{title}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <TwoColumns style={{ height: "100%" }}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </TwoColumns>
      )}
    </>
  );
}
