export type ProductsState = {[key: string]: ProductInfo};

export interface ProductInfo {
  name: string,
  group: string,
  price: number,
  userScore: number[],
  dateOfArrival: string,
  description: string,
}

export const LOAD_PRODUCTS_STATE = 'LOAD_PRODUCTS_STATE';

interface LoadProductsAction {
  type: typeof LOAD_PRODUCTS_STATE,
  payload: ProductsState,
}

export type ProductsActionTypes = LoadProductsAction;