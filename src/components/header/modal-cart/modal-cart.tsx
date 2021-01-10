import React from 'react';
import { shallowEqual, useSelector, useDispatch, useStore } from 'react-redux';
import './modal-cart.styl';

import { AppState } from '../../../store';
import { addToCart, removeFromCart } from '../../../store/cart/actions';
import { DispatchCartAction } from '../../../store/cart/types';
import usePriceAfterDiscounts from '../../../hooks/use-price-after-discounts';

import ModalCartItem from './modal-cart-item/modal-cart-item';
import Loader from '../../loader/loader';
import LinkAsButton from '../../link-as-button/link-as-button';


const ModalCart: React.FC = () => {
  const dispatch: any = useDispatch();
  const addProductToCart: DispatchCartAction = productId => dispatch(addToCart(productId));
  const removeProductFromCart: DispatchCartAction = productId => dispatch(removeFromCart(productId));

  const selectProductsState = (state: AppState) => {return state.products};
  const selectCartState = (state: AppState) => {return state.cart};
  const productsState = useSelector(selectProductsState, shallowEqual);
  const cartState = useSelector(selectCartState, shallowEqual);


  const request: { [key: string]: string } = {
    products: '/mocks/products.json',
    discounts: '/mocks/discounts.json'
  };

  const currentState = useStore().getState();
  const transferData = (requestResults: { [key: string]: any }) => {
    Object.entries(requestResults).forEach(([key, data]) => {
      if ( Object.keys(currentState[key]).length !== 0 ) { return }
      dispatch({type: `LOAD_${key.toUpperCase()}_STATE`, payload: data});
    });
  };

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
      quantity={cartState[productId]}
      increment={addProductToCart}
      decrement={removeProductFromCart}
    />;
  };

  return (
    <div className="modal-cart__container">
      <Loader requests={request} transferData={transferData}>
        <div className="modal-cart__top-wrapper">
          <h5 className="modal-cart__heading">In cart: <span>{Object.keys(cartState).length} products</span></h5>
          <p className="modal-cart__total-price">Total price: <span>{countTotalPrice()}</span></p>
        </div>
        <ul className="modal-cart__products-list">
          {Object.keys(cartState).map(cartMapCallback as typeof cartMapCallback)}
        </ul>
        <div className="modal-cart__bottom-wrapper">
          <LinkAsButton className="modal-cart__link-btn" to="/cart" subtype="rectangular-green">Go to cart</LinkAsButton>
          <LinkAsButton className="modal-cart__link-btn" to="/checkout" subtype="rectangular-red">Checkout</LinkAsButton>
        </div>
      </Loader>
    </div>
  );
};

export default ModalCart;