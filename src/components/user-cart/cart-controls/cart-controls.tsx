import React from 'react';
import './cart-controls.styl';

import LinkAsButton from '../../link-as-button/link-as-button';
import PreventDefaultAndShowAlert from '../../prevent-default-and-show-alert/prevent-default-and-show-alert';

interface Props {
  totalPrice: string;
}

const CartControls = ({ totalPrice }: Props) => {
  const blockedCheckoutLink = PreventDefaultAndShowAlert({
    component: (
      <LinkAsButton to="/checkout" subtype="rectangular-red">
        Proceed to checkout
      </LinkAsButton>
    ),
    eventType: 'onClick',
    alertMessage: 'This is a static site and checkout link is inactive',
  });

  return (
    <div className="cart-controls">
      <p className="cart-controls__paragraph">
        Total <span className="cart-controls__price">{totalPrice}</span>
      </p>
      {blockedCheckoutLink}
    </div>
  );
};

export default CartControls;
