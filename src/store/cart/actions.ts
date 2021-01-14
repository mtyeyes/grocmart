import { LOAD_CART_STATE, ADD_TO_CART, REMOVE_FROM_CART, CartState, ProductId } from './types';

export const loadCartState = (data: CartState) => {
  return {
    type: LOAD_CART_STATE,
    payload: data,
  };
};

export const addToCart = (productId: ProductId) => {
  return {
    type: ADD_TO_CART,
    payload: productId,
  };
};

export const removeFromCart = (productId: ProductId, isRemoveAll: boolean) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {productId, isRemoveAll},
  };
};