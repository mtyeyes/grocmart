import React from 'react';
import './search-result.styl';

import { Link } from 'react-router-dom';
import { PATH } from '../../../../../app';
import { ProductId } from '../../../../../store/cart/types';

interface Props {
  productId: ProductId;
  productName: string;
  closeModal: () => void;
}

const SearchResult = ({ productId, productName, closeModal }: Props) => {
  return (
    <li className="search-result">
      <Link className="search-result__link" to={`/shop/${productId}`} onClick={closeModal}>
        <img
          className="search-result__thumbnail"
          src={`${PATH}images/${productId}-small.png`}
          alt={`${productName}`}
          loading="lazy"
        />
        <h6 className="search-result__title">{productName}</h6>
      </Link>
    </li>
  );
};

export default SearchResult;
