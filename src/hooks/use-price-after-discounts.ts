import { shallowEqual, useSelector } from 'react-redux';
import { AppState } from '../store/index';
import { ProductId } from '../store/cart/types';

interface CountPriceFunction {
  (productId: ProductId, returnType: 'return number'): number;
  (productId: ProductId, returnType: 'return stringAsCurrency'): string;
}

const usePriceAfterDiscounts = () => {
  const productsState = useSelector((state: AppState) => state.products, shallowEqual);
  const discountsState = useSelector((state: AppState) => state.discounts, shallowEqual);

  const countPriceAfterDiscounts: CountPriceFunction = (productId: any, returnType: any): any => {
    const productData = productsState[productId];
    const discountForProduct =
      discountsState.discountsByProduct && discountsState.discountsByProduct[productId]
        ? 1 - discountsState.discountsByProduct[productId]
        : 1;
    const discountForProductGroup =
      discountsState.discountsByGroup && discountsState.discountsByGroup[productData['group']]
        ? 1 - discountsState.discountsByGroup[productData['group']]
        : 1;

    const priceAfterDiscounts = productData['price'] * discountForProduct * discountForProductGroup;

    switch (returnType) {
      case 'return number':
        return priceAfterDiscounts;
      case 'return stringAsCurrency':
        return priceAfterDiscounts.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });
    }
  };

  return countPriceAfterDiscounts;
};

export default usePriceAfterDiscounts;
