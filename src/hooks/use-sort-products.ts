import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import usePriceAfterDiscounts from './use-price-after-discounts';
import findAverage from '../utils/find-average';
import { AppState } from '../store/index';

interface UseSortProducts {
  (): [
    SortedItems,
    {
      valuesToSortBy: string[];
      valueToSortBy: string;
      setValueToSortBy: Dispatch<SetStateAction<string>>;
    },
  ];
}

type SortedItems = string[];

const useSortProducts: UseSortProducts = () => {
  const productsState = useSelector((state: AppState) => state.products, shallowEqual);
  const [sortedItems, setSortedItems] = useState(Object.keys(productsState));
  const [valueToSortBy, setValueToSortBy] = useState('name' as typeof valuesToSortBy[number]);
  const valuesToSortBy = ['name', 'rating', 'price'];
  const countPriceAfterDiscounts = usePriceAfterDiscounts();

  useEffect(() => {
    switch (valueToSortBy) {
      case 'price': {
        const sortByPrice = (productAId: string, productBId: string) => {
          return countPriceAfterDiscounts(productAId, 'return number') - countPriceAfterDiscounts(productBId, 'return number');
        };
        setSortedItems(Object.keys(productsState).sort(sortByPrice));
        break;
      }
      case 'rating': {
        const sortByRating = (productAId: string, productBId: string) => {
          const AUserScoreArr = productsState[productAId].userScore;
          const BUserScoreArr = productsState[productBId].userScore;
          return findAverage(BUserScoreArr) - findAverage(AUserScoreArr);
        };
        setSortedItems(Object.keys(productsState).sort(sortByRating));
        break;
      }
      case 'name': {
        setSortedItems(Object.keys(productsState).sort());
        break;
      }
    }
  }, [productsState, valueToSortBy]);

  return [sortedItems, { valuesToSortBy, valueToSortBy, setValueToSortBy }];
};

export default useSortProducts;
