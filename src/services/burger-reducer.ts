import { ICountIngredient, IIngredientsItem } from "../models/ingredients";
import { IOrder } from "../models/order";
import { IBurgerState } from "./burger-state";
import {
    SET_BUN,
    UPDATE_CONSTRUCTOR_INGREDIENT,
    SET_CONSTRUCTOR_INGREDIENTS,
    SET_INGREDIENTS,
    SET_ORDER,
    SET_TOTAL_SUM
} from "./burger-types";

interface setOrderAction{
    type: typeof SET_ORDER;
    payload: IOrder | null;
}

interface setIngredientsAction{
    type: typeof SET_INGREDIENTS;
    payload: IIngredientsItem[];
}

interface setConstructorIngredientsAction{
    type: typeof SET_CONSTRUCTOR_INGREDIENTS;
    payload: IIngredientsItem[];
}

interface setBunAction{
    type: typeof SET_BUN;
    payload: IIngredientsItem | null;
}

interface updateConstructorIngredientAction{
    type: typeof UPDATE_CONSTRUCTOR_INGREDIENT;
    payload: { ingredient: IIngredientsItem; effect: 'add' | 'delete' };
}

interface setTotalSumAction{
    type: typeof SET_TOTAL_SUM;
    payload: number;
}


export type TBurgerConstructorAction = setOrderAction |
    setIngredientsAction | setConstructorIngredientsAction |
    setBunAction | setTotalSumAction | updateConstructorIngredientAction;

export function reducer(state: IBurgerState, action: TBurgerConstructorAction) {
    switch (action.type) {
        case SET_ORDER:
            const newOrder = { ...action.payload } as IOrder | null;
            return { ...state, order: newOrder};
        case SET_INGREDIENTS:
            const newIngredients = [...action.payload] as IIngredientsItem[];
            const newTotalSum = getTotal(newIngredients);
            return { ...state, ingredients: newIngredients, totalSum: newTotalSum };
        case SET_CONSTRUCTOR_INGREDIENTS:
            const newConstructorIngredients = [...action.payload] as IIngredientsItem[];
            return { ...state, constructorIngredients: newConstructorIngredients };
        case UPDATE_CONSTRUCTOR_INGREDIENT:
            const ingredient = action.payload.ingredient;
            const effect = action.payload.effect;
            const index = state.countIngredients.findIndex(el => el.id === ingredient._id);

            let newCountIngredients: ICountIngredient[] = [];

            if (effect === 'add') {
                if (index !== -1) {
                    newCountIngredients = state.countIngredients.map((item) => item.id === ingredient._id ? { ...item, count: item.count + 1 } : item)
                } else {
                    newCountIngredients = [...state.countIngredients, { id: ingredient._id, count: 1 }];
                }

                return {
                    ...state,
                    countIngredients: [...newCountIngredients],
                    constructorIngredients: [
                        ...state.constructorIngredients,
                        { ...ingredient, sort_id: `${state.constructorIngredients.length}` }
                    ]
                };
            } else if (effect === 'delete') {
                if (state.countIngredients[index].count > 1) {
                    newCountIngredients = state.countIngredients.map((item) => item.id === ingredient._id ? {...item, count: item.count - 1} : item)
                } else {
                    newCountIngredients = state.countIngredients.filter((item) => item.id !== ingredient._id);
                }

                const newConstructorIngredients = state.constructorIngredients.filter((item) => item.sort_id !== ingredient.sort_id);
                return {
                    ...state,
                    countIngredients: [...newCountIngredients],
                    constructorIngredients: newConstructorIngredients
                };
            } else {
                return state;
            }
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