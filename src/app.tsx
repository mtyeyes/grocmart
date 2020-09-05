import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './domain/home/home';
import Error from './domain/error/error';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route exact path='/home' component={ Home }/>
          <Route path='*' component={ Error }/>
        </Switch>
      </Router>
    );
  }
}

export default App;