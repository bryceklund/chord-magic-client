import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import SplashPage from './SplashPage/SplashPage.js'
import Login from './AccountPages/Login.js';
import Register from './AccountPages/Register.js';
import SavedProgressions from './SavedProgressions/SavedProgressions.js';
import Editor from './Editor/Editor.js';
import Nav from './Nav/Nav'
import { API_BASE_URL, API_TOKEN } from './config'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signedIn: true,
      userid: '001',
      selected: null,
      progId: null,
      progName: null
    }
  }

  signIn = (userid) => {
    //authenticate against db
    this.setState({
      signedIn: true,
      userid
    })
  }

  signOut = () => {
    this.setState({
      signedIn: false,
      userid: null
    })
  }

  loadProgression = (progression) => {
    this.setState({
      selected: progression.chords,
      progId: progression.id,
      progName: progression.name
    })
  }

  setCurrentProg = (name, id) => {
    this.setState({
      progName: name,
      progId: id
    })
  }

  render() {
    return (
      <Switch>
          <Route exact path='/' component={SplashPage} />
          <React.Fragment>
            <Nav signedIn={this.state.signedIn} signOut={this.signOut} />
            <Route path='/login' render={(props) => <Login {...props} signIn={this.signIn} /> }/>
            <Route path='/register' render={(props) => <Register {...props} signIn={this.signIn} /> } />
            <Route path='/editor'  render={(props) => <Editor {...props} 
                                                          progression={this.state.selected} 
                                                          currentId={this.state.progId} 
                                                          currentName={this.state.progName} 
                                                          signedIn={this.state.signedIn} 
                                                          userid={this.state.userid}
                                                          setCurrentProg={this.setCurrentProg} />} />
            <Route path='/saved' render={(props) => <SavedProgressions {...props} 
                                                          loadProgression={this.loadProgression} 
                                                          userid={this.state.userid} />} />   
          </React.Fragment>
      </Switch>
    );
  }
}

export default App;