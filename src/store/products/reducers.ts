import { LOAD_PRODUCTS_STATE, SET_CURRENT_USER_SCORE, REMOVE_CURRENT_USER_SCORE, ProductsState, ProductsActionTypes } from './types';

const initialState: ProductsState = {};

export const productsReducer = (state = initialState, action: ProductsActionTypes): ProductsState => {
  switch (action.type) {
  case LOAD_PRODUCTS_STATE: {
    return action.payload;
  }
  case SET_CURRENT_USER_SCORE: {
    const {productId, rating} = action.payload;
    const newState = {...state};
    newState[productId].currentUserScore = rating;
    newState[productId].userScore = [...newState[productId].userScore, rating];
    return newState;
  }
  case REMOVE_CURRENT_USER_SCORE: {
    const {productId, rating} = action.payload;
    const newState = {...state};
    newState[productId].currentUserScore = null;
    newState[productId].userScore.splice(newState[productId].userScore.indexOf( rating ), 1);
    return newState;
  }
  default:
    return state;
  }
};