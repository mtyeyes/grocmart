import { LOAD_DISCOUNTS_STATE, DiscountsState } from './types';

export const loadDiscountsState = (discounts: DiscountsState) => {
  return {
    type: LOAD_DISCOUNTS_STATE,
    payload: discounts,
  };
};