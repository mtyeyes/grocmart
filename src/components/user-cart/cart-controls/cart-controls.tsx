import React from 'react';
import './cart-controls.styl';

import LinkAsButton from '../../link-as-button/link-as-button';
import BlockedLinkToCheckout from '../../link-as-button/blocked-link-to-checkout/blocked-link-to-checkout';

type Props = {
  totalPrice: string,
}

const CartControls: React.FC<Props> = ({ totalPrice }) => {
  const blockedCheckoutLink = BlockedLinkToCheckout(<LinkAsButton to="/checkout" subtype="rectangular-red">Proceed to checkout</LinkAsButton>);

  return (
    <div className="cart-controls">
      <p className="cart-controls__paragraph">Total <span className="cart-controls__price">{totalPrice}</span></p>
      {blockedCheckoutLink}
    </div>
  );
};

export default CartControls;