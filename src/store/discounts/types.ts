export type DiscountsState = {
  discountsByGroup: DiscountsByGroup,
  discountsByProduct: DiscountsByProduct
};

interface DiscountsByGroup {[key: string]: number}

interface DiscountsByProduct {[key: string]: number}

export const GET_DISCOUNTS = 'GET_DISCOUNTS';

interface GetDiscountsAction {
  type: typeof GET_DISCOUNTS;
  payload: DiscountsState;
}

export type DiscountsActionTypes = GetDiscountsAction;