import { CartState, ProductId } from './types';

export const loadCartState = (data: CartState) => {
  return <const>{
    type: 'LOAD_CART_STATE',
    payload: data,
  };
};

export const addToCart = (productId: ProductId) => {
  return <const>{
    type: 'ADD_TO_CART',
    payload: productId,
  };
};

export const removeFromCart = (productId: ProductId, isRemoveAllItems: boolean) => {
  return <const>{
    type: 'REMOVE_FROM_CART',
    payload: { productId, isRemoveAllItems },
  };
};

export type CartActionTypes = ReturnType<typeof loadCartState | typeof addToCart | typeof removeFromCart>;
