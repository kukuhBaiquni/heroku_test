import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Components/Home'
import SuccessLogin from './Components/SuccessLogin'
import './Gaya/app.css'

class App extends Component {
  render() {
    return (
      <div className='main-body'>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/verified' component={SuccessLogin} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
