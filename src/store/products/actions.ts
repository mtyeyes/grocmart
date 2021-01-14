import { LOAD_PRODUCTS_STATE, SET_CURRENT_USER_SCORE, REMOVE_CURRENT_USER_SCORE, ProductsState } from './types';

export const loadProductsState = (products: ProductsState) => {
  return {
    type: LOAD_PRODUCTS_STATE,
    payload: products,
  };
};

export const setCurrentUserScoreAction = (data: {productId: string, rating: number}) => {
  return {
    type: SET_CURRENT_USER_SCORE,
    payload: data,
  };
};

export const removeCurrentUserScoreAction = (data: {productId: string, rating: number}) => {
  return {
    type: REMOVE_CURRENT_USER_SCORE,
    payload: data,
  };
};