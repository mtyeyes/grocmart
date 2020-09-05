import { GET_DISCOUNTS, DiscountsState, DiscountsActionTypes } from './types';

const initialState: DiscountsState = {discountsByGroup: {}, discountsByProduct: {}};

export const discountsReducer = (state = initialState, action: DiscountsActionTypes): DiscountsState => {
  switch (action.type) {
  case GET_DISCOUNTS: {
    return action.payload;
  }
  default:
    return state;
  }
};