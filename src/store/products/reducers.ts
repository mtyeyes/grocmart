import { LOAD_PRODUCTS_STATE, ProductsState, ProductsActionTypes } from './types';

const initialState: ProductsState = {};

export const productsReducer = (state = initialState, action: ProductsActionTypes): ProductsState => {
  switch (action.type) {
  case LOAD_PRODUCTS_STATE: {
    return action.payload;
  }
  default:
    return state;
  }
};