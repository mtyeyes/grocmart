import React from 'react';
import './gallery-item.styl';

import HiddenText from '../../hidden-text/hidden-text';
import Icon from '../../icon/icon';
import LinkAsButton from '../../link-as-button/link-as-button';
import Button from '../../button/button';

import { addToCart } from '../../../store/cart/actions';
import { ProductId } from '../../../store/cart/types';

interface Props {
  imgUrl: string;
  imgDescription: string;
  productId: ProductId;
  productPrice: string;
  addToCart: typeof addToCart;
}

const GalleryItem = ({ imgUrl, imgDescription, productId, productPrice, addToCart }: Props) => {
  return (
    <div className="gallery-item">
      <img className="gallery-item__img" src={imgUrl} alt={imgDescription} loading="lazy" />
      <div className="gallery-item__controls">
        <h4 className="gallery-item__description">{imgDescription}</h4>
        <p className="gallery-item__product-price">{productPrice}</p>
        <LinkAsButton
          className="gallery-item__btn gallery-item__btn--product-info"
          subtype="round-grey"
          to={`/shop/${productId}`}
        >
          <Icon iconId="search" />
          <HiddenText>Product info</HiddenText>
        </LinkAsButton>
        <Button
          className="gallery-item__btn gallery-item__btn--add-to-cart"
          onClick={() => {
            addToCart(productId);
          }}
        >
          <Icon iconId="basket" />
          <HiddenText>Add to cart</HiddenText>
        </Button>
      </div>
    </div>
  );
};

export default GalleryItem;
