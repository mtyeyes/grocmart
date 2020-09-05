import React from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import './modal-cart.styl';

import { getCartState, addToCart, removeFromCart } from '../../store/cart/actions';
import { AppState } from '../../store';
import { CartState, ProductId, CartActionTypes } from '../../store/cart/types';
import { getProducts } from '../../store/products/actions';
import { ProductsState, ProductsActionTypes } from '../../store/products/types';
import { getDiscounts } from '../../store/discounts/actions';
import { DiscountsState, DiscountsActionTypes } from '../../store/discounts/types';
import useCountPrice from '../../hooks/use-count-price';

import ModalCartItem from './modal-cart-item/modal-cart-item';
import Loader from '../loader/loader';

type DispatchProductsState = (data: ProductsState) => ProductsActionTypes;
type DispatchDiscountsState = (data: DiscountsState) => DiscountsActionTypes;
type DispatchCartState = (data: CartState) => CartActionTypes;
type DispatchAddToCart = (data: ProductId) => CartActionTypes;
type DispatchRemoverFromCart = (data: ProductId) => CartActionTypes;
type RequestResult = {
  cart: CartState,
  products: ProductsState,
  discounts: DiscountsState
};

const ModalCart: React.FC = () => {

  const requests = {
    'cart': '/mocks/cart-state.json',
    'products': '/mocks/products.json',
    'discounts': '/mocks/discounts.json',
  };

  const transferData = (requestResult: RequestResult) => {
    setCartState(requestResult.cart);
    setProductsState(requestResult.products);
    setDiscountsState(requestResult.discounts);
  };

  const dispatch: any = useDispatch();
  const setProductsState: DispatchProductsState = data => dispatch(getProducts(data));
  const setDiscountsState: DispatchDiscountsState = data => dispatch(getDiscounts(data));
  const setCartState: DispatchCartState = data => dispatch(getCartState(data));
  const addProductToCart: DispatchAddToCart = productId => dispatch(addToCart(productId));
  const removeProductFromCart: DispatchRemoverFromCart = productId => dispatch(removeFromCart(productId));

  const selectProductsState = (state: AppState) => {return state.products};
  const selectCartState = (state: AppState) => {return state.cart};
  const productsState = useSelector(selectProductsState, shallowEqual);
  const cartState = useSelector(selectCartState, shallowEqual);

  const countFinalPrice = useCountPrice();

  let totalPrice = 0;
  Object.entries(cartState).forEach(([productId, quantity]) => totalPrice += (countFinalPrice(productId) * quantity));

  const cartMapCallback = (productId: string) => {
    const productData = productsState[productId];
    const productFinalPrice = (countFinalPrice(productId) * cartState[productId]).toLocaleString('en-US', {style:'currency', currency:'USD'});
    return <ModalCartItem productId={productId} key={productId} productName={productData['name']} productPrice={productFinalPrice} quantity={cartState[productId]} increment={addProductToCart} decrement={removeProductFromCart}></ModalCartItem>;
  };

  return (
    <div className="modal-cart__container">
      <Loader transferData={transferData} requests={requests}>
        <div className="modal-cart__top-wrapper">
          <h5 className="modal-cart__heading">In cart: <span>{Object.keys(cartState).length} products</span></h5>
          <p className="modal-cart__total-price">Total price: <span>{totalPrice.toLocaleString('en-US', {style:'currency', currency:'USD'})}</span></p>
        </div>
        <ul className="modal-cart__products-list">
          {Object.keys(cartState).map(cartMapCallback as typeof cartMapCallback)}
        </ul>
        <div className="modal-cart__bottom-wrapper">
          <Link className="modal-cart__link-btn modal-cart__link-btn--hollow" to="/cart">Go to cart</Link>
          <Link className="modal-cart__link-btn modal-cart__link-btn--red" to="/checkout">Checkout</Link>
        </div>
      </Loader>
    </div>
  );
};

export default ModalCart;