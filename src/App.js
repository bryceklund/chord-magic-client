import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import SplashPage from './SplashPage/SplashPage.js'
import Login from './AccountPages/Login.js';
import Register from './AccountPages/Register.js';
import SavedProgressions from './SavedProgressions/SavedProgressions.js';
import Editor from './Editor/Editor.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    }
  }
  render() {
    return (
      <React.Fragment>
          <Route exact path='/' component={SplashPage} />
          <Route exact path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/editor' render={(props) => <Editor {...props} signedIn={this.state.signedIn} />} />
          <Route path='/saved' render={(props) => <SavedProgressions {...props} signedIn={this.state.signedIn} />} /> 
      </React.Fragment>
    );
  }
}

export default App;