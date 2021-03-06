import React from 'react';
import './modal-cart-item.styl';

import { addToCart, removeFromCart } from '../../../../store/cart/actions';
import Counter from '../../../counter/counter';

import { PATH } from '../../../../app';
import { ProductId } from '../../../../store/cart/types';

interface Props {
  productId: ProductId;
  productPrice: string;
  productName: string;
  productQuantity: number;
  addProduct: typeof addToCart;
  removeProduct: typeof removeFromCart;
}

const ModalCartItem = ({ productId, productName, productQuantity, productPrice, addProduct, removeProduct }: Props) => {
  return (
    <li className="cart-item__container">
      <h6 className="cart-item__title">{productName}</h6>
      <img src={`${PATH}images/${productId}-small.png`} className="cart-item__thumbnail" alt={`${productName}`} loading="lazy" />
      <Counter
        classNamePrefix={'cart-item'}
        count={productQuantity}
        increment={() => {
          addProduct(productId);
        }}
        decrement={() => {
          removeProduct(productId, false);
        }}
      />
      <p className="cart-item__price">{productPrice}</p>
    </li>
  );
};

export default ModalCartItem;
