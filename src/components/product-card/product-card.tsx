import React, { forwardRef, Ref } from 'react';
import './product-card.styl';

import HiddenText from '../hidden-text/hidden-text';
import Icon from '../icon/icon';
import LinkAsButton from '../link-as-button/link-as-button';
import Button from '../button/button';

import { PATH } from '../../app';
import { addToCart } from '../../store/cart/actions';
import { ProductId } from '../../store/cart/types';

export interface Props {
  productId: ProductId;
  priceBeforeDiscounts: string;
  priceAfterDiscounts: string;
  productName: string;
  productRating: number;
  addToCart: typeof addToCart;
  className?: string;
}

const ProductCard = forwardRef(
  (
    { productId, priceBeforeDiscounts, priceAfterDiscounts, productName, productRating, addToCart, className }: Props,
    ref: Ref<HTMLLIElement>,
  ) => (
    <li key={productId} className={className ? `product-card__container ${className}` : 'product-card__container'} ref={ref}>
      <div className="product-card">
        <div className="product-card__flags-container">
          {productRating >= 4 && (
            <p className="product-card__flag product-card__flag--green">
              <HiddenText>Product is </HiddenText>popular
            </p>
          )}
          {priceBeforeDiscounts !== priceAfterDiscounts && (
            <p className="product-card__flag product-card__flag--red">
              <HiddenText>Product on </HiddenText>sale
            </p>
          )}
        </div>
        <img src={`${PATH}images/${productId}.png`} className="product-card__thumbnail" alt={productName} loading="lazy" />
        <h4 className="product-card__title">{productName}</h4>
        <div className="product-card__price-container">
          {priceBeforeDiscounts !== priceAfterDiscounts && (
            <p className="product-card__price product-card__price--original">
              <HiddenText>Orginal price</HiddenText>
              {priceBeforeDiscounts}
            </p>
          )}
          <p className="product-card__price product-card__price--total">
            <HiddenText>Total price</HiddenText>
            {priceAfterDiscounts}
          </p>
        </div>
        <div className="product-card__controls">
          <LinkAsButton
            className="product-card__btn product-card__btn--product-info"
            subtype="round-grey"
            to={`/shop/${productId}`}
          >
            <Icon iconId="search" />
            <HiddenText>Product info</HiddenText>
          </LinkAsButton>
          <Button
            className="product-card__btn product-card__btn--add-to-cart"
            onClick={() => {
              addToCart(productId);
            }}
          >
            <Icon iconId="basket" />
            <HiddenText>Add to cart</HiddenText>
          </Button>
        </div>
      </div>
    </li>
  ),
);

ProductCard.displayName = 'ProductCard';

export default ProductCard;
