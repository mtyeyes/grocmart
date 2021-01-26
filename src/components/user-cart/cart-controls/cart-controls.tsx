import React from 'react';
import './cart-controls.styl';

import LinkAsButton from '../../link-as-button/link-as-button';

type Props = {
  totalPrice: string,
}

const CartControls: React.FC<Props> = ({ totalPrice }) => {
  return (
    <div className="cart-controls">
      <p className="cart-controls__paragraph">Total <span className="cart-controls__price">{totalPrice}</span></p>
      <LinkAsButton to="/checkout" subtype="rectangular-red">Proceed to checkout</LinkAsButton>
    </div>
  );
};

export default CartControls;