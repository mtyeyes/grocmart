import { GET_DISCOUNTS, DiscountsState } from './types';

export const getDiscounts = (discounts: DiscountsState) => {
  return {
    type: GET_DISCOUNTS,
    payload: discounts,
  };
};