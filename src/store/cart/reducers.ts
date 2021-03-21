import { CartState } from './types';
import { CartActionTypes } from './actions';

const initialState: CartState = {};

export const cartReducer = (
  state = initialState,
  action: CartActionTypes,
): CartState => {
  switch (action.type) {
    case 'LOAD_CART_STATE': {
      return action.payload;
    }
    case 'ADD_TO_CART': {
      const productId = action.payload;
      if (state[productId] >= 98) {
        return { ...state, [productId]: 99 };
      }
      return { ...state, [productId]: (state[productId] || 0) + 1 };
    }
    case 'REMOVE_FROM_CART': {
      const productId = action.payload.productId;
      if (state[productId] <= 1 || action.payload.isRemoveAllItems) {
        const newState = { ...state };
        delete newState[productId];
        return newState;
      } else {
        return { ...state, [productId]: state[productId] - 1 };
      }
    }
    default:
      return state;
  }
};
