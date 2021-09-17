import { IIngredientsItem } from "../models/ingredients";
import { IOrder } from "../models/order";
import { Api } from "./api";

const api = Api.getInstance();

export const getIngredientData = async () => {
  return await (
    await api.getFetch<{ data: IIngredientsItem[] }>("/ingredients")
  ).data;
};

export const getOrderData = async (ingredients: string[]) => {
  return await api.postProtectedFetch<IOrder>(
    "/orders",
    JSON.stringify({ ingredients })
  );
};

interface IChangePasswordResponse {
  success: boolean;
  message: string;
}

export const getChangePassword = async (email: string) => {
  return await api.postFetch<IChangePasswordResponse>(
    "/password-reset",
    JSON.stringify({ email })
  );
};

export const getResetPassword = async (password: string, token: string) => {
  return await api.postFetch<IChangePasswordResponse>(
    "/password-reset/reset",
    JSON.stringify({ password, token })
  );
};
