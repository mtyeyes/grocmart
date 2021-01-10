import React from 'react';
import './modal-cart-item.styl';

import Button from '../../../button/button';
import HiddenText from '../../../hidden-text/hidden-text';
import Icon from '../../../icon/icon';

import { DispatchCartAction } from '../../../../store/cart/types';

type Props = {
  productId: string,
  productPrice: string,
  productName: string,
  quantity: number,
  increment: DispatchCartAction,
  decrement: DispatchCartAction,
}

const ModalCartItem: React.FC<Props> = ({ productId, productName, quantity, productPrice, increment, decrement }) => {
  return (
    <li className="cart-item__container">
      <h6 className="cart-item__title">{productName}</h6>
      <img src={`/images/${productId}-small.png`} className="cart-item__thumbnail" alt={`${productName}`}></img>
      <div className="cart-item__counter">
        <p className="cart-item__quantity">{quantity}</p>
        <Button className="cart-item__counter-btn cart-item__counter-btn--decrease" onClick={()=>{decrement(productId)}}>
          <Icon className="cart-item__counter-btn-icon" iconId="minus"/>
          <HiddenText>Remove one</HiddenText>
        </Button>
        <Button className="cart-item__counter-btn cart-item__counter-btn--increase" onClick={()=>{increment(productId)}}>
          <Icon className="cart-item__counter-btn-icon" iconId="plus"/>
          <HiddenText>Add one more</HiddenText>
        </Button>
      </div>
      <p className="cart-item__price">{productPrice}</p>
    </li>
  );
};

export default ModalCartItem;