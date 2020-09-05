import { GET_PRODUCTS, ProductsState } from './types';

export const getProducts = (products: ProductsState) => {
  return {
    type: GET_PRODUCTS,
    payload: products,
  };
};