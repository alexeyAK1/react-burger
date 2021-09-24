import { BackendFactory } from "dnd-core";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MultiBackend, { TouchTransition } from "react-dnd-multi-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useSelector } from "react-redux";
import TwoColumns from "../../layouts/two-columns/two-columns";
import { RootState } from "../../services/store";
import Loader from "../ui/loader/loader";
import BurgerConstructor from "./burger-constructor/burger-constructor";
import BurgerIngredients from "./burger-ingredients/burger-ingredients";

const CustomHTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
    },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true }, // Note that you can call your backends with options
      preview: true,
      transition: TouchTransition,
    },
  ],
};

export default function BurgerFactory() {
  const isLoading = useSelector(
    (state: RootState) => state.ingredients.isLoading
  );
  const title = "Соберите бургер";

  return (
    <>
      <h1>{title}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <TwoColumns style={{ height: "100%" }}>
          <DndProvider
            backend={MultiBackend as unknown as BackendFactory}
            options={CustomHTML5toTouch}
          >
              <BurgerIngredients />
              <BurgerConstructor />
          </DndProvider>
        </TwoColumns>
      )}
    </>
  );
}
