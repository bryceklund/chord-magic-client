import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import SplashPage from './SplashPage/SplashPage.js'
import Login from './AccountPages/Login.js';
import Register from './AccountPages/Register.js';
import SavedProgressions from './Editor/SavedProgressions/SavedProgressions.js';
import Editor from './Editor/Editor.js';
import Nav from './Nav/Nav.js'
import './reset.css';

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <React.Fragment>
          <Route exact path='/' component={SplashPage} />
          <Route exact path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/editor' component={Editor} />
          <Route path='/saved' component={SavedProgressions} /> 
      </React.Fragment>
    );
  }
}

export default App;