import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { cartReducer } from './cart/reducers';
import { productsReducer } from './products/reducers';
import { discountsReducer } from './discounts/reducers';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  discounts: discountsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = (preloadedState: {}) => (
  createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(),
  )
);

const store = configureStore({});

export default store;