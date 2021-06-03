export interface DiscountsState {
  discountsByGroup?: DiscountsByGroup;
  discountsByProduct?: DiscountsByProduct;
}

interface DiscountsByGroup {
  [key: string]: number;
}

interface DiscountsByProduct {
  [key: string]: number;
}
