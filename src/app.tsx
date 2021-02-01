import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStore } from 'react-redux';
import { StateKeys, AppState } from './store/index';
import useSyncStateWithLocalStorage from './hooks/use-sync-state-with-local-storage';
// @ts-ignore
console.log(JSON.stringify(PUBLIC_PATH));
// @ts-ignore
export const PATH = JSON.stringify(PUBLIC_PATH);

import ScrollReset from './components/scroll-reset/scroll-reset';
import Home from './domain/home/home';
import Error from './domain/error/error';
import Shop from './domain/shop/shop';
import Cart from './domain/cart/cart';
import Gallery from './domain/gallery/gallery';
import Product from './domain/product/product';

const App = () => {
  const currentState: AppState = useStore().getState();
  for (const key in currentState) {useSyncStateWithLocalStorage(key as StateKeys)}
  return (
    <Router basename={PATH}>
      <ScrollReset />
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/shop' component={ Shop }/>
        <Route exact path='/shop/cart' component={ Cart }/>
        <Route path='/shop/:productId' component={ Product }/>
        <Route exact path='/gallery' component={ Gallery }/>
        <Route path='*' component={ Error }/>
      </Switch>
    </Router>
  );
};

export default App;