import React, { useEffect, useState } from 'react';
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
import findAverage from '../../utils/find-average';
import useSortProducts from '../../hooks/use-sort-products';
import useFilterProducts from '../../hooks/use-filter-products';

const Catalog = () => {
  const countPriceAfterDiscounts = usePriceAfterDiscounts();
  const dispatch = useDispatch<AppDispatch>();
  const productsState = useSelector(((state: AppState) => state.products), shallowEqual);
  const [sortedProducts, {valuesToSortBy, valueToSortBy, setValueToSortBy}] = useSortProducts();
  const {filteredProducts, filterProducts, filterState, filterDispatch, numberOfItemsInCategories} = useFilterProducts(sortedProducts);
  const [filteredProductsData, setFilteredProductsData] = useState([] as ProductCardProps[]);
  const addProductToCart = (productId: string) => dispatch(addToCart(productId));

  useEffect(() => {
    filterProducts();
  }, [productsState, sortedProducts]);

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