import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch, useStore } from 'react-redux';
import FlipMove from 'react-flip-move';
import './latest-arrivals.styl';

import { AppState } from '../../store';
import { addToCart } from '../../store/cart/actions';
import { DispatchCartAction } from '../../store/cart/types';
import usePriceAfterDiscounts from '../../hooks/use-price-after-discounts';

import Loader from '../loader/loader';
import FilterWithUnderline, {FilterState} from '../filter-with-underline/filter-with-underline';
import ProductCard from '../product-card/product-card';

const LatestArrivals: React.FC = () => {
  const dispatch: any = useDispatch();
  const addProductToCart: DispatchCartAction = productId => dispatch(addToCart(productId));

  const productsState = useSelector(((state: AppState) => state.products), shallowEqual);
  const [newestProducts, setNewestProducts] = useState([] as string[]);
  const [displayedProducts, setDisplayedProducts] = useState([] as string[]);
  const [filterState, setFilterState] = useState({selectedFilter: 'all', availableFilters: ['all']} as FilterState);
  const countPriceAfterDiscounts = usePriceAfterDiscounts();

  const request: { [key: string]: string } = {
    products: '/mocks/products.json',
    discounts: '/mocks/discounts.json'
  };

  const currentState = useStore().getState();
  const transferData = (requestResults: { [key: string]: any }) => {
    Object.entries(requestResults).forEach(([key, data]) => {
      if ( Object.keys(currentState[key]).length !== 0 ) { return }
      dispatch({type: `LOAD_${key.toUpperCase()}_STATE`, payload: data});
    });
  };

  useEffect(()=>{
    let productsArray;
    if (Object.keys(productsState).length <= 8) {
      productsArray = Object.keys(productsState);
    } else {
      const sortProductsByArrival = (a: string, b: string): number => {
        return (Date.parse(productsState[b].dateOfArrival) - Date.parse(productsState[a].dateOfArrival));
      };
      productsArray = [...Object.keys(productsState)].sort(sortProductsByArrival).slice(0, 8);
    }
    const groupsToFilter = new Set(productsArray.map(productId => productsState[productId].group));
    setFilterState((prevState) => {return {...prevState, availableFilters: ['all', ...groupsToFilter]}});
    setNewestProducts(productsArray);
  }, [productsState]);

  useEffect(() => {
    if (filterState.selectedFilter === 'all') {
      setDisplayedProducts(newestProducts);
    } else {
      const productsToDisplay = newestProducts.filter(item => productsState[item].group === filterState.selectedFilter);
      setDisplayedProducts(productsToDisplay);
    }
  }, [filterState, productsState, newestProducts]);

  const galleryMapCallback = (productId: string) => {
    const { name, price, userScore } = productsState[productId];
    const averageUserScore = (userScore.reduce((a: number, b: number) => a + b))/userScore.length;
    const priceBeforeDiscounts = price.toLocaleString('en-US', {style:'currency', currency:'USD'});
    const priceAfterDiscounts = countPriceAfterDiscounts(productId).toLocaleString('en-US', {style:'currency', currency:'USD'});
    return(
      <li className="latest-arrivals__item-wrapper" key={productId}>
        <ProductCard productId={productId} productName={name} priceBeforeDiscounts={priceBeforeDiscounts} priceAfterDiscounts={priceAfterDiscounts} productRating={averageUserScore} addToCart={addProductToCart}/>
      </li>
    );
  };

  return (
    <section className="latest-arrivals">
      <h2 className="latest-arrivals__heading">Latest arrivals</h2>
      <b className="latest-arrivals__exclamation">New products</b>
      <Loader requests={request} transferData={transferData}>
        {filterState.availableFilters.length >= 2 &&
          <FilterWithUnderline selectedFilter={filterState.selectedFilter} setSelectedFilter={setFilterState} availableFilters={filterState.availableFilters} />
        }
        <FlipMove typeName="ul" className="latest-arrivals__list">
          {displayedProducts.map(galleryMapCallback as typeof galleryMapCallback)}
        </FlipMove>
      </Loader>
    </section>
  );
};

export default LatestArrivals;