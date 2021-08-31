import { useReducer, useEffect } from "react";
import { getOrderData } from "../../../common/agent";
import { IIngredientsItem } from "../../../models/ingredients";
import { IOrder } from "../../../models/order";
import bun from "../../../utils/bun";
import ingredients from "../../../utils/ingredients";
import { SET_BUN, SET_INGREDIENTS, SET_ORDER} from "../services/burger-constructor-action-types";
import { reducer } from "../services/burger-constructor-reducer";

export interface IBurgerConstructorState {
    bun: IIngredientsItem | null;
    ingredients: IIngredientsItem[];
    order: IOrder | null;
    totalSum: number;
};

export const initialBurgerConstructorState: IBurgerConstructorState = { bun: null, ingredients: [], order: null, totalSum: 0 };

export const useBurgerConstructorState = () => {
    const [state, dispatch] = useReducer(reducer, initialBurgerConstructorState);
    // const getIngredientIds = () => state.ingredients.map((item) => item._id);
    // const getNElementArr = (n:number, element?: string) => new Array(n).fill(element);

     useEffect(() => {
         dispatch({type: SET_BUN, payload: bun as IIngredientsItem});
         dispatch({type: SET_INGREDIENTS, payload: ingredients as IIngredientsItem[]});
     }, []);

    const setOrder = async (callback?: () => void, errorFunction?: () => void) => {
        // const ingredients = [...getIngredientIds(), ...getNElementArr(2, state.bun?._id)]
        const ingredients = ['60d3b41abdacab0026a733c8', '60d3b41abdacab0026a733c9'];
        // const ingredients = ["60666c42cc7b410027a1a9b5", "60666c42cc7b410027a1a9b6", "60666c42cc7b410027a1a9b7", "60666c42cc7b410027a1a9b4", "60666c42cc7b410027a1a9c1", "60666c42cc7b410027a1a9c2", "60666c42cc7b410027a1a9c3", "60666c42cc7b410027a1a9c4cs"];
        try {
            const orderData = await getOrderData(ingredients);

            dispatch({ type: SET_ORDER, payload: orderData });
            if (callback) {
                callback();
            }
        } catch (error) {
            if (errorFunction) {
                errorFunction();
            }
        }
    };

    const updateTotalSum = () => (state.totalSum + (state && state.bun ? state.bun.price : 0)*100*2) / 100;

    return {
        ...state,
        totalSum: updateTotalSum(),
        setOrder,
    }
}
