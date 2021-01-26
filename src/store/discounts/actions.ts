import { DiscountsState } from './types';

export const loadDiscountsState = (discounts: DiscountsState) => {
  return <const>{
    type: 'LOAD_DISCOUNTS_STATE',
    payload: discounts,
  };
};

export type DiscountsActionTypes = ReturnType<typeof loadDiscountsState>;