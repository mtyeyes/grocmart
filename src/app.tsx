import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './domain/home/home';
import Error from './domain/error/error';
import AboutUs from './domain/about-us/about-us';
import Shop from './domain/shop/shop';
import Cart from './domain/cart/cart';
import Gallery from './domain/gallery/gallery';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route exact path='/about' component={ AboutUs }/>
          <Route exact path='/shop' component={ Shop }/>
          <Route exact path='/cart' component={ Cart }/>
          <Route exact path='/gallery' component={ Gallery }/>
          <Route path='*' component={ Error }/>
        </Switch>
      </Router>
    );
  }
}

export default App;