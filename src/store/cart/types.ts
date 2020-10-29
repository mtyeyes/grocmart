export interface CartState {
  [key: string]: number
}

export type ProductId = string;

export type DispatchCartAction = (data: ProductId) => CartActionTypes;

export const LOAD_CART_STATE = 'LOAD_CART_STATE';

interface LoadCartStateAction {
  type: typeof LOAD_CART_STATE,
  payload: CartState,
}

export const ADD_TO_CART = 'ADD_TO_CART';

interface AddToCartAction {
  type: typeof ADD_TO_CART,
  payload: ProductId,
}

export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART,
  payload: ProductId,
}

export type CartActionTypes = LoadCartStateAction | AddToCartAction | RemoveFromCartAction;