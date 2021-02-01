import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import './search-results.styl';

import Loader from '../../../loader/loader';
import { Link } from 'react-router-dom';
import Button from '../../../button/button';

import { AppState, AppDispatch } from '../../../../store/index';
import {ProductsState} from '../../../../store/products/types';
import { PATH } from '../../../../app';

type Props = {
  searchQuery: string,
  setSearchQuery: Dispatch<SetStateAction<string | null>>,
  closeModal?: () => void
}

const capitalizeFirstLetter = (string: string) => {
  return (string.charAt(0).toUpperCase() + string.slice(1));
};

const SearchResults: React.FC<Props> = ({ searchQuery, setSearchQuery, closeModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const productsState = useSelector(((state: AppState) => state.products), shallowEqual);
  const [searchResults, setSearchResults] = useState([] as string[]);

  const request = {products: `${PATH}mocks/products.json`};
  const transferData = (requestResult: {products: ProductsState}) => {
    if ( Object.keys(productsState).length !== 0 ) { dispatch({type: 'LOAD_PRODUCTS_STATE', payload: requestResult.products}) } else { return }
  };

  const searchByName = (name: string) => {
    const substrToFilter = name.toLowerCase();
    setSearchResults(Object.keys(productsState).filter(productId => productsState[productId].name.toLowerCase().includes(substrToFilter)));
  };

  useEffect(() => {
    searchByName(searchQuery);
  }, [productsState]);

  const searchResultsMapCallback = (productId: string) => {
    const productName = capitalizeFirstLetter(productsState[productId].name);
    return (
      <li className="search-results__item search-result" key={productId}>
        <Link className="search-result__link" to={`/shop/${productId}`} onClick={closeModal}>
          <img className="search-result__thumbnail" src={`${PATH}images/${productId}-small.png`} alt={`${productName}`}></img>
          <h6 className="search-result__title">{productName}</h6>
        </Link>
      </li>
    );
  };

  return (
    <div className="search-results__container">
      <Button className="search-results__reset-btn" onClick={()=>{setSearchQuery(null)}}>Search another product</Button>
      <Loader customColor='white' requests={request} transferData={transferData}>
        {(searchResults.length) ?
          <ul className="search-results__list">{searchResults.map(searchResultsMapCallback)}</ul> :
          <p className="search-results__no-results-disclaimer">There is no product with such name</p>
        }
      </Loader>
    </div>
  );
};

export default SearchResults;