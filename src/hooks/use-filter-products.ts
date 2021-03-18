import { useState, useReducer, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import usePriceAfterDiscounts from './use-price-after-discounts';
import findAverage from '../utils/find-average';
import { AppState } from '../store/index';

export type FilterState = {
  price: PriceFilter,
  selectedCategories: SelectedCategories,
  name: string,
  rating: null | number,
}

type PriceFilter = {
  minPrice: number,
  maxPrice: number,
  selectedMinPrice: number,
  selectedMaxPrice: number,
}

export type SelectedCategories = {
  [key: string]: boolean,
}

export type FilterAction = { type: 'changeCategoriesToFilterBy', payload: SelectedCategories }
  | { type: 'changePriceToFilterBy', payload: {selectedMinPrice: number, selectedMaxPrice: number} }
  | { type: 'changeNameToFilterBy', payload: string }
  | { type: 'changeRatingToFilterBy', payload: null | number}

type NumberOfItemsInCategories = {
  [key: string]: number
}

const useFilterProducts = ( productsToFilter: string[] ) => {
  const initialFilterState: FilterState = {
    price: {
      minPrice: 0,
      maxPrice: 30,
      selectedMinPrice: 0,
      selectedMaxPrice: 30,
    },
    selectedCategories: {},
    name: '',
    rating: null,
  };

  const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
    switch (action.type) {
      case 'changeCategoriesToFilterBy':
        return {...state, selectedCategories: action.payload};
      case 'changePriceToFilterBy':
        return {...state, price: {...state.price, ...action.payload}};
      case 'changeNameToFilterBy':
        return {...state, name: action.payload};
      case 'changeRatingToFilterBy':
        return {...state, rating: action.payload};
    }
  };

  const countPriceAfterDiscounts = usePriceAfterDiscounts();
  const productsState = useSelector(((state: AppState) => state.products), shallowEqual);
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);
  const [numberOfItemsInCategories, setNumberOfItemsInCategories] = useState({} as NumberOfItemsInCategories);
  const [filteredProducts, setFilteredProducts] = useState([] as string[]);

  useEffect(() => {
    updateProductsGroups();
  }, [productsState, filteredProducts, filterState.name, filterState.price, filterState.rating]);

  const filterProducts = () => {
    setFilteredProducts(filterProductsByGroups(updateNumberOfItemsInCategories(filterProductsByRating(filterProductsByName(filterProductsByPrice(productsToFilter))))));
  };

  const filterProductsByPrice = (productsIds: string[]) => {
    return productsIds.filter(productId => {
      const productPrice = countPriceAfterDiscounts(productId, 'return number');
      if (productPrice > filterState.price.selectedMinPrice && productPrice < filterState.price.selectedMaxPrice) { return true } else { return false }
    });
  };

  const filterProductsByName = (productsIds: string[]) => {
    const substrToFilter = filterState.name.toLowerCase();
    if (substrToFilter) {
      return productsIds.filter(productId => productsState[productId].name.toLowerCase().includes(substrToFilter));
    } else {
      return productsIds;
    }
  };

  const filterProductsByRating = (productsIds: string[]) => {
    const targetRating = filterState.rating;
    if (targetRating) {
      return productsIds.filter(productId => {
        const ratingsArray = productsState[productId].userScore;
        return Math.round(findAverage(ratingsArray)) >= targetRating;
      });
    } else {
      return productsIds;
    }
  };

  const filterProductsByGroups = (productsIds: string[]) => {
    const selectedGroups = Object.keys(filterState.selectedCategories).filter(categoryName => filterState.selectedCategories[categoryName]);
    if (selectedGroups.length === Object.keys(filterState.selectedCategories).length) {
      return productsIds;
    } else {
      return productsIds.filter(productId => selectedGroups.includes(productsState[productId].group));
    }
  };

  const updateProductsGroups = () => {
    const newCategoriesState = Object.keys(productsState).reduce((accum, curValue) => {
      const productGroup = productsState[curValue].group;
      if (!accum[productGroup]) {
        accum[productGroup] = (filterState.selectedCategories[productGroup] === false) ? false : true;
      }
      return accum;
    }, {} as SelectedCategories);
    filterDispatch({type: 'changeCategoriesToFilterBy', payload: newCategoriesState});
  };

  const updateNumberOfItemsInCategories = (productsIds: string[]) => {
    const newState = productsIds.reduce((acc, id) => {
      const groupName = productsState[id].group;
      if(acc[groupName]) {
        acc[groupName]++;
      } else {
        acc[groupName] = 1;
      }
      return acc;
    }, {} as NumberOfItemsInCategories);
    setNumberOfItemsInCategories(newState);
    return productsIds;
  };

  return {filteredProducts, filterProducts, filterState, filterDispatch, numberOfItemsInCategories};
};

export default useFilterProducts;