import React from 'react';
import './modal-cart-item.styl';

import Button from '../../button/button';
import HiddenText from '../../hidden-text/hidden-text';

type Props = {
  productId: string,
  productPrice: string,
  productName: string,
  quantity: number,
  increment: any,
  decrement: any,
}

const ModalCartItem: React.FC<Props> = ({ productId, productName, quantity, productPrice, increment, decrement }) => {
  return (
    <li className="cart-item__container">
      <h6 className="cart-item__title">{productName}</h6>
      <img src={`/images/${productId}-small.png`} className="cart-item__thumbnail" alt={`${productName}`}></img>
      <div className="cart-item__counter">
        <p className="cart-item__quantity">{quantity}</p>
        <Button className="cart-item__counter-btn cart-item__counter-btn--decrease" onClick={()=>{decrement(productId)}}>
          <HiddenText>Remove one</HiddenText>
        </Button>
        <Button className="cart-item__counter-btn cart-item__counter-btn--increase" onClick={()=>{increment(productId)}}>
          <HiddenText>Add one more</HiddenText>
        </Button>
      </div>
      <p className="cart-item__price">{productPrice}</p>
    </li>
  );
};

export default ModalCartItem;