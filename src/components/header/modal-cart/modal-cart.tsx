import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import './modal-cart.styl';

import { AppState, AppDispatch } from '../../../store';
import { addToCart, removeFromCart } from '../../../store/cart/actions';
import usePriceAfterDiscounts from '../../../hooks/use-price-after-discounts';

import ModalCartItem from './modal-cart-item/modal-cart-item';
import Loader from '../../loader/loader';
import LinkAsButton from '../../link-as-button/link-as-button';
import PreventDefaultAndShowAlert from '../../prevent-default-and-show-alert/prevent-default-and-show-alert';



const ModalCart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addProductToCart = (productId: string) => dispatch(addToCart(productId));
  const removeProductFromCart = (productId: string) => dispatch(removeFromCart(productId, false));

  const selectProductsState = (state: AppState) => {return state.products};
  const selectCartState = (state: AppState) => {return state.cart};
  const productsState = useSelector(selectProductsState, shallowEqual);
  const cartState = useSelector(selectCartState, shallowEqual);

  const blockedCheckoutLink = PreventDefaultAndShowAlert({
    component: <LinkAsButton className="modal-cart__link-btn" to="/checkout" subtype="rectangular-red">Checkout</LinkAsButton>,
    eventType: 'onClick',
    alertMessage: 'This is a static site and checkout link is inactive'
  });

  const countPriceAfterDiscounts = usePriceAfterDiscounts();

  const countTotalPrice = () => {
    let totalPrice = 0;
    Object.entries(cartState).forEach(([productId, quantity]) => totalPrice += (countPriceAfterDiscounts(productId, 'return number') * quantity));
    return totalPrice.toLocaleString('en-US', {style:'currency', currency:'USD'});
  };

  const cartMapCallback = (productId: string) => {
    const productData = productsState[productId];
    const productFinalPrice = (countPriceAfterDiscounts(productId, 'return number') * cartState[productId]).toLocaleString('en-US', {style:'currency', currency:'USD'});
    return <ModalCartItem
      productId={productId}
      key={productId}
      productName={productData['name']}
      productPrice={productFinalPrice}
      productQuantity={cartState[productId]}
      addProduct={addProductToCart}
      removeProduct={removeProductFromCart}
    />;
  };

  return (
    <div className="modal-cart__container">
      <Loader requests={ {stateRequests: ['products', 'discounts']} }>
        <div className="modal-cart__top-wrapper">
          <h5 className="modal-cart__heading">In cart: <span>{Object.keys(cartState).length} products</span></h5>
          <p className="modal-cart__total-price">Total price: <span>{countTotalPrice()}</span></p>
        </div>
        <ul className="modal-cart__products-list">
          {Object.keys(cartState).map(cartMapCallback)}
        </ul>
        <div className="modal-cart__bottom-wrapper">
          <LinkAsButton className="modal-cart__link-btn" to="/shop/cart" subtype="rectangular-green">Go to cart</LinkAsButton>
          {blockedCheckoutLink}
        </div>
      </Loader>
    </div>
  );
};

export default ModalCart;