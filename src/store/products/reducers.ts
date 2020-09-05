import { GET_PRODUCTS, ProductsState, ProductsActionTypes } from './types';

const initialState: ProductsState = {};

export const productsReducer = (state = initialState, action: ProductsActionTypes): ProductsState => {
  switch (action.type) {
  case GET_PRODUCTS: {
    return action.payload;
  }
  default:
    return state;
  }
};