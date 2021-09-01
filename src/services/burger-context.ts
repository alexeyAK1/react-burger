import { createContext } from "react";
import { IBurgerState } from "./burger-state";

export const BurgerContext = createContext<IBurgerState | undefined>(undefined);