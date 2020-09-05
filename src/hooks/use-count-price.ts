import { shallowEqual, useSelector } from 'react-redux';
import { AppState } from '../store/index';

type UseCountPrice = () => CountPriceFunction;
type CountPriceFunction = (productId: string) => number;

const useCountPrice: UseCountPrice = () => {
  const productsState = useSelector(((state: AppState) => state.products), shallowEqual);
  const discountsState = useSelector(((state: AppState) => state.discounts), shallowEqual);

  const countFinalPrice: CountPriceFunction = (productId) => {
    const productData = productsState[productId];
    const discountForProduct = discountsState.discountsByProduct[productId] ? 1 - discountsState.discountsByProduct[productId] : 1;
    const discountForProductGroup = discountsState.discountsByGroup[productData['group']] ? 1 - discountsState.discountsByGroup[productData['group']] : 1;

    const priceAfterDiscounts = productData['price'] * discountForProduct * discountForProductGroup;

    return priceAfterDiscounts;
  };

  return countFinalPrice;
};

export default useCountPrice;