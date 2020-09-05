export type ProductsState = {[key: string]: ProductInfo};

interface ProductInfo {
  name: string;
  group: string;
  price: number;
  isNew: boolean;
  userScore: number[];
}

type ProductId = string;

export const GET_PRODUCTS = 'GET_PRODUCTS';

interface GetProductsAction {
  type: typeof GET_PRODUCTS;
  payload: ProductsState;
}

export type ProductsActionTypes = GetProductsAction;