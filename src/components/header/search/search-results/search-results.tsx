import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import './search-results.styl';

import Loader from '../../../loader/loader';
import Button from '../../../button/button';

import { AppState } from '../../../../store/index';
import { ProductId } from '../../../../store/cart/types';
import SearchResult from './search-result/search-result';

interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string | null>>;
  closeModal: () => void;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const SearchResults = ({ searchQuery, setSearchQuery, closeModal }: Props) => {
  const productsState = useSelector((state: AppState) => state.products, shallowEqual);
  const [searchResults, setSearchResults] = useState([] as string[]);

  const searchByName = (name: string) => {
    const substrToFilter = name.toLowerCase();
    setSearchResults(
      Object.keys(productsState).filter((productId) => productsState[productId].name.toLowerCase().includes(substrToFilter)),
    );
  };

  useEffect(() => {
    searchByName(searchQuery);
  }, [productsState]);

  const searchResultsMapCallback = (productId: ProductId) => {
    const productName = capitalizeFirstLetter(productsState[productId].name);
    return <SearchResult productId={productId} productName={productName} closeModal={closeModal} key={productId} />;
  };

  return (
    <div className="search-results__container">
      <Button
        className="search-results__reset-btn"
        onClick={() => {
          setSearchQuery(null);
        }}
      >
        Search another product
      </Button>
      <Loader customColor="white" requests={{ stateRequests: ['products'] }}>
        {searchResults.length ? (
          <ul className="search-results__list">{searchResults.map(searchResultsMapCallback)}</ul>
        ) : (
          <p className="search-results__no-results-disclaimer">There is no product with such name</p>
        )}
      </Loader>
    </div>
  );
};

export default SearchResults;
