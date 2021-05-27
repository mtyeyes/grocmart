import { ProductsState } from './types';

export const loadProductsState = (products: ProductsState) => {
  return <const>{
    type: 'LOAD_PRODUCTS_STATE',
    payload: products,
  };
};

export const setCurrentUserScoreAction = (data: { productId: string; rating: number }) => {
  return <const>{
    type: 'SET_CURRENT_USER_SCORE',
    payload: data,
  };
};

export const removeCurrentUserScoreAction = (data: { productId: string; rating: number }) => {
  return <const>{
    type: 'REMOVE_CURRENT_USER_SCORE',
    payload: data,
  };
};

export type ProductsActionTypes = ReturnType<
  typeof loadProductsState | typeof setCurrentUserScoreAction | typeof removeCurrentUserScoreAction
>;
