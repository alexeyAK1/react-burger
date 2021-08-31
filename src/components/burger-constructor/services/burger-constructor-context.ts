import { createContext } from "react";
import { IBurgerConstructorState } from "../hooks/use-burger-constructor-state";

export const BurgerConstructorContext = createContext<IBurgerConstructorState | undefined>(undefined);

export const BurgerConstructorContextProvider = BurgerConstructorContext.Provider;