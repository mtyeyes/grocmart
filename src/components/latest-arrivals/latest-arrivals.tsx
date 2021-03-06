import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import FlipMove from 'react-flip-move';
import './latest-arrivals.styl';

import Loader from '../loader/loader';
import FilterWithUnderline, { FilterState } from '../filter-with-underline/filter-with-underline';
import ProductCard from '../product-card/product-card';
import usePriceAfterDiscounts from '../../hooks/use-price-after-discounts';
import ScrollAnimation from 'react-animate-on-scroll';

import { AppState, AppDispatch } from '../../store';
import { addToCart } from '../../store/cart/actions';
import { ProductId } from '../../store/cart/types';

const LatestArrivals = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addProductToCart = (productId: ProductId) => dispatch(addToCart(productId));

  const productsState = useSelector((state: AppState) => state.products, shallowEqual);
  const [newestProducts, setNewestProducts] = useState([] as string[]);
  const [displayedProducts, setDisplayedProducts] = useState([] as string[]);
  const [filterState, setFilterState] = useState({
    selectedFilter: 'all',
    availableFilters: ['all'],
  } as FilterState);
  const countPriceAfterDiscounts = usePriceAfterDiscounts();

  useEffect(() => {
    let productsArray;
    if (Object.keys(productsState).length <= 8) {
      productsArray = Object.keys(productsState);
    } else {
      const sortProductsByArrival = (a: string, b: string): number => {
        return Date.parse(productsState[b].dateOfArrival) - Date.parse(productsState[a].dateOfArrival);
      };
      productsArray = [...Object.keys(productsState)].sort(sortProductsByArrival).slice(0, 8);
    }
    const groupsToFilter = new Set(productsArray.map((productId) => productsState[productId].group));
    setFilterState((prevState) => {
      return { ...prevState, availableFilters: ['all', ...groupsToFilter] };
    });
    setNewestProducts(productsArray);
  }, [productsState]);

  useEffect(() => {
    if (filterState.selectedFilter === 'all') {
      setDisplayedProducts(newestProducts);
    } else {
      const productsToDisplay = newestProducts.filter((item) => productsState[item].group === filterState.selectedFilter);
      setDisplayedProducts(productsToDisplay);
    }
  }, [filterState, productsState, newestProducts]);

  const galleryMapCallback = (productId: ProductId) => {
    const { name, price, userScore } = productsState[productId];
    const averageUserScore = userScore.reduce((a: number, b: number) => a + b) / userScore.length;
    const priceBeforeDiscounts = price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const priceAfterDiscounts = countPriceAfterDiscounts(productId, 'return stringAsCurrency');
    return (
      <ProductCard
        productId={productId}
        productName={name}
        priceBeforeDiscounts={priceBeforeDiscounts}
        priceAfterDiscounts={priceAfterDiscounts}
        productRating={averageUserScore}
        addToCart={addProductToCart}
        key={productId}
      />
    );
  };

  return (
    <section className="latest-arrivals">
      <Loader requests={{ stateRequests: ['products', 'discounts'] }}>
        <ScrollAnimation animateIn="fade-in-from-top" animateOnce={true}>
          <h2 className="latest-arrivals__heading">Latest arrivals</h2>
          <b className="latest-arrivals__exclamation">New products</b>
        </ScrollAnimation>
        {filterState.availableFilters.length >= 2 && (
          <FilterWithUnderline
            selectedFilter={filterState.selectedFilter}
            setSelectedFilter={setFilterState}
            availableFilters={filterState.availableFilters}
          />
        )}
        <FlipMove typeName="ul" className="latest-arrivals__list" leaveAnimation="none">
          {displayedProducts.map(galleryMapCallback)}
        </FlipMove>
      </Loader>
    </section>
  );
};

export default LatestArrivals;
