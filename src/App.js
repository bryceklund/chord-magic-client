import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, Link} from 'react-router-dom';
import SplashPage from './SplashPage/SplashPage.js.js'
import Login from './AccountPages/Login.js.js';
import Register from './AccountPages/Register.js.js';
import SavedProgressions from './Editor/SavedProgressions/SavedProgressions.js.js';
import Editor from './Editor/Editor.js.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' Component={SplashPage} />
        {/*<Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />
        <Route path='/editor' Component={Editor} />
        <Route path='/saved' Component={SavedProgressions} />  */}
      </div>
    );
  }
}

export default App;