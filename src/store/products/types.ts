export type ProductsState = {[key: string]: ProductInfo};

interface ProductInfo {
  name: string,
  group: string,
  price: number,
  isNew: boolean,
  userScore: number[],
}

type ProductId = string;

export const LOAD_PRODUCTS_STATE = 'LOAD_PRODUCTS_STATE';

interface LoadProductsAction {
  type: typeof LOAD_PRODUCTS_STATE,
  payload: ProductsState,
}

export type ProductsActionTypes = LoadProductsAction;