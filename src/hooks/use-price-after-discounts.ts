import { shallowEqual, useSelector } from 'react-redux';
import { AppState } from '../store/index';

type UsePriceAfterDiscounts = () => CountPriceFunction;
type CountPriceFunction = (productId: string) => number;

const usePriceAfterDiscounts: UsePriceAfterDiscounts = () => {
  const productsState = useSelector(((state: AppState) => state.products), shallowEqual);
  const discountsState = useSelector(((state: AppState) => state.discounts), shallowEqual);

  const countPriceAfterDiscounts: CountPriceFunction = (productId) => {
    const productData = productsState[productId];
    const discountForProduct = (discountsState.discountsByProduct && discountsState.discountsByProduct[productId]) ? 1 - discountsState.discountsByProduct[productId] : 1;
    const discountForProductGroup = (discountsState.discountsByGroup && discountsState.discountsByGroup[productData['group']]) ? 1 - discountsState.discountsByGroup[productData['group']] : 1;

    const priceAfterDiscounts = productData['price'] * discountForProduct * discountForProductGroup;

    return priceAfterDiscounts;
  };

  return countPriceAfterDiscounts;
};

export default usePriceAfterDiscounts;