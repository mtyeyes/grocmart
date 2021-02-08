import React, { useState, useEffect, useReducer } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import './catalog.styl';

import { AppState, AppDispatch } from '../../store';
import { addToCart } from '../../store/cart/actions';
import usePriceAfterDiscounts from '../../hooks/use-price-after-discounts';

import Loader from '../loader/loader';
import CatalogFiltersControls from './catalog-filters-controls/catalog-filters-controls';
import PriceFilterControls from './catalog-filters-controls/price-filter-controls/price-filter-controls';
import CategoriesFilterControls from './catalog-filters-controls/categories-filter-controls/categories-filter-controls';
import ByNameFilterControls from './catalog-filters-controls/by-name-filter-controls/by-name-filter-controls';
import RatingFilterControls from './catalog-filters-controls/rating-filter-controls/rating-filter-controls';
import SortingSelect from './sorting-select/sorting-select';
import FilteredProductsDisplay from './filtered-products-display/filtered-products-display';
import {Props as ProductCardProps} from '../product-card/product-card';
import useFindAverage from '../../hooks/use-find-average';

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

const Catalog = () => {
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
  const findAverage = useFindAverage();
  const dispatch = useDispatch<AppDispatch>();
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);
  const [numberOfItemsInCategories, setNumberOfItemsInCategories] = useState({} as NumberOfItemsInCategories);
  const productsState = useSelector(((state: AppState) => state.products), shallowEqual);
  const [sortedProducts, setSortedProducts] = useState(Object.keys(productsState));
  const [valueToSortBy, setValueToSortBy] = useState('name' as typeof valuesToSortBy[number]);
  const valuesToSortBy = ['name', 'rating', 'price'];
  const [filteredProducts, setFilteredProducts] = useState([] as string[]);
  const [filteredProductsData, setFilteredProductsData] = useState([] as ProductCardProps[]);
  const addProductToCart = (productId: string) => dispatch(addToCart(productId));

  useEffect(() => {
    switch (valueToSortBy) {
    case 'price': {
      const sortByPrice = (productAId: string, productBId: string) => {
        return countPriceAfterDiscounts(productAId, 'return number') - countPriceAfterDiscounts(productBId, 'return number');
      };
      setSortedProducts(Object.keys(productsState).sort(sortByPrice));
      break;
    }
    case 'rating': {
      const sortByRating = (productAId: string, productBId: string) => {
        const AUserScoreArr = productsState[productAId].userScore;
        const BUserScoreArr = productsState[productBId].userScore;
        return findAverage(BUserScoreArr) - findAverage(AUserScoreArr);
      };
      setSortedProducts(Object.keys(productsState).sort(sortByRating));
      break;
    }
    case 'name': {
      setSortedProducts(Object.keys(productsState).sort());
      break;
    }
    }
  }, [productsState, valueToSortBy]);

  useEffect(() => {
    filterProducts();
  }, [productsState, sortedProducts]);

  useEffect(() => {
    updateProductsGroups();
  }, [productsState, filteredProducts, filterState.name, filterState.price, filterState.rating]);

  useEffect(() => {
    const newFiltereProductData = filteredProducts.map(productId => {
      return {
        productId: productId,
        productName: productsState[productId].name,
        priceBeforeDiscounts: productsState[productId].price.toLocaleString('en-US', {style:'currency', currency:'USD'}),
        priceAfterDiscounts: countPriceAfterDiscounts(productId, 'return stringAsCurrency'),
        productRating: findAverage(productsState[productId].userScore),
        addToCart: addProductToCart
      };
    });
    setFilteredProductsData(newFiltereProductData);
  }, [productsState, filteredProducts]);

  const filterProducts = () => {
    setFilteredProducts(filterProductsByGroups(updateNumberOfItemsInCategories(filterProductsByRating(filterProductsByName(filterProductsByPrice(sortedProducts))))));
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

  return (
    <section className="catalog__container">
      <Loader requests={ {stateRequests: ['products', 'discounts']} }>
        <CatalogFiltersControls filterProducts={filterProducts} selectedMinPrice={filterState.price.selectedMinPrice} selectedMaxPrice={filterState.price.selectedMaxPrice}>
          <PriceFilterControls dispatchFilterAction={filterDispatch} {...filterState.price} />
          <CategoriesFilterControls categoriesData={filterState.selectedCategories} dispatchFilterAction={filterDispatch} numberOfItems={numberOfItemsInCategories} />
          <RatingFilterControls selectedRating={filterState.rating} dispatchFilterAction={filterDispatch} />
          <ByNameFilterControls nameFilter={filterState.name} dispatchFilterAction={filterDispatch} />
        </CatalogFiltersControls>
        <FilteredProductsDisplay filteredProductsData={filteredProductsData}>
          <SortingSelect valuesToSortBy={valuesToSortBy} selectedValueToSortBy={valueToSortBy} setSelectedValueToSortBy={setValueToSortBy} />
        </FilteredProductsDisplay>
      </Loader>
    </section>
  );
};

export default Catalog;