export type DiscountsState = {
  discountsByGroup?: DiscountsByGroup,
  discountsByProduct?: DiscountsByProduct,
};

interface DiscountsByGroup {[key: string]: number}

interface DiscountsByProduct {[key: string]: number}

export const LOAD_DISCOUNTS_STATE = 'LOAD_DISCOUNTS_STATE';

interface LoadDiscountsState {
  type: typeof LOAD_DISCOUNTS_STATE,
  payload: DiscountsState,
}

export type DiscountsActionTypes = LoadDiscountsState;