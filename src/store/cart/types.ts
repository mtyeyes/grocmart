export interface CartState {
  [key: string]: number
}

export type ProductId = string;

export const GET_CART_STATE = 'GET_CART_STATE';

interface GetCartStateAction {
  type: typeof GET_CART_STATE;
  payload: CartState;
}

export const ADD_TO_CART = 'ADD_TO_CART';

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: ProductId;
}

export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: ProductId;
}

export type CartActionTypes = GetCartStateAction | AddToCartAction | RemoveFromCartAction;