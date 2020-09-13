import { LOAD_PRODUCTS_STATE, ProductsState } from './types';

export const loadProductsState = (products: ProductsState) => {
  return {
    type: LOAD_PRODUCTS_STATE,
    payload: products,
  };
};