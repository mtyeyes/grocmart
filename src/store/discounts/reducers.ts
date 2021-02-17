import { DiscountsState } from './types';
import { DiscountsActionTypes } from './actions';

const initialState: DiscountsState = {};

export const discountsReducer = (state = initialState, action: DiscountsActionTypes): DiscountsState => {
  switch (action.type) {
    case 'LOAD_DISCOUNTS_STATE': {
      return action.payload;
    }
    default:
      return state;
  }
};