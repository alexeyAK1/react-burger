import { IIngredientsItem } from "../../../models/ingredients1";
import { IOrder } from "../../../models/order1";
import { IBurgerConstructorState } from "../hooks/use-burger-constructor-state";
import { SET_BUN, SET_INGREDIENTS, SET_ORDER, SET_TOTAL_SUM } from "./burger-constructor-action-types";

interface setOrderAction{
    type: typeof SET_ORDER;
    payload: IOrder | null;
}

interface setIngredientsAction{
    type: typeof SET_INGREDIENTS;
    payload: IIngredientsItem[];
}

interface setBunAction{
    type: typeof SET_BUN;
    payload: IIngredientsItem | null;
}

interface setTotalSumAction{
    type: typeof SET_TOTAL_SUM;
    payload: number;
}



export type TBurgerConstructorAction  = setOrderAction | setIngredientsAction | setBunAction | setTotalSumAction;

export function reducer(state: IBurgerConstructorState, action: TBurgerConstructorAction) {
    switch (action.type) {
        case SET_ORDER:
            const newOrder = { ...action.payload } as IOrder | null;
            return { ...state, order: newOrder};
        case SET_INGREDIENTS:
            const newIngredients = [...action.payload] as IIngredientsItem[];
            const newTotalSum = getTotal(newIngredients);
            return { ...state, ingredients: newIngredients, totalSum: newTotalSum };
        case SET_BUN:
            const newBun = { ...action.payload } as IIngredientsItem | null;
            return { ...state, bun: newBun };
        case SET_TOTAL_SUM:
            return { ...state, totalSum: action.payload };
        default:
            return state;
    }
}

export function getTotal(ingredients: IIngredientsItem[]) {
    const total = ingredients.reduce((accumulator, item) => accumulator + (item.price * 100), 0);

    return total;
}