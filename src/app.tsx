import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStore } from 'react-redux';
import { StateKeys, AppState } from './store/index';
import useSyncStateWithLocalStorage from './hooks/use-sync-state-with-local-storage';
import { ROUTES } from './constants';
// @ts-ignore: variable PATH inserted on compilation by webpack
export const PATH = JSON.stringify(PUBLIC_PATH).replace(/"/g, '');

import ScrollReset from './components/scroll-reset/scroll-reset';
import TitleAdjust from './components/title-adjust/title-adjust';
import Home from './domain/home/home';
import Error from './domain/error/error';
import Shop from './domain/shop/shop';
import Cart from './domain/cart/cart';
import Gallery from './domain/gallery/gallery';
import Product from './domain/product/product';

const App = () => {
  const { home, shop, cart, gallery } = ROUTES;

  const currentState: AppState = useStore().getState();
  for (const key in currentState) {
    useSyncStateWithLocalStorage(key as StateKeys);
  }

  return (
    <Router basename={PATH}>
      <TitleAdjust />
      <ScrollReset />
      <Switch>
        <Route exact path={home} component={Home} />
        <Route exact path={shop} component={Shop} />
        <Route exact path={cart} component={Cart} />
        <Route path={`${shop}/:productId`} component={Product} />
        <Route exact path={gallery} component={Gallery} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
