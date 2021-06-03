import React from 'react';
import { Link } from 'react-router-dom';
import './special-offer-item.styl';

import HiddenText from '../../../hidden-text/hidden-text';

import { PATH } from '../../../../app';
import { ProductId } from '../../../../store/cart/types';

interface Props {
  productId: ProductId;
  productName: string;
  priceBeforeDiscounts: string;
  priceAfterDiscounts: string;
}

const SpecialOfferItem = ({ productId, productName, priceBeforeDiscounts, priceAfterDiscounts }: Props) => {
  return (
    <li className="specials-slider-item">
      <div className="specials-slider-item__wrapper">
        <img className="specials-slider-item__image" src={`${PATH}images/${productId}.png`} alt={productName} loading="lazy" />
        <h5 className="specials-slider-item__product-title">
          <Link to={`/shop/${productId}`}>{productName}</Link>
        </h5>
        <div className="specials-slider-item__price-container">
          <del className="specials-slider-item__price specials-slider-item__price--original">
            <HiddenText>Orginal price</HiddenText>
            {priceBeforeDiscounts}
          </del>
          <p className="specials-slider-item__price specials-slider-item__price--total">
            <HiddenText>Total price</HiddenText>
            {priceAfterDiscounts}
          </p>
        </div>
      </div>
    </li>
  );
};

export default SpecialOfferItem;
