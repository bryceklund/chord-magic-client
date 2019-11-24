import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay'
import SplashPage from './SplashPage/SplashPage.js'
import Login from './AccountPages/Login.js'
import Register from './AccountPages/Register.js'
import SavedProgressions from './SavedProgressions/SavedProgressions.js'
import Editor from './Editor/Editor.js'
import Nav from './Nav/Nav'
import Spinner from './Spinner'
import { API_BASE_URL, API_TOKEN } from './config'
import TokenService from './services/tokenService'
import AudioStore from './Editor/AudioStore'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.loginElement = React.createRef()
    this.editorElement = React.createRef()
    this.navElement = React.createRef()
    this.state = {
      redirect: false,
      selected: null,
      progId: null,
      progName: null,
      token: null,
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  redirectToEditor = () => {
    if (this.state.redirect) {
      return <Redirect to='/editor' />
    }
  }

  signIn = (username, password, e) => {
    if (e) {
      e.preventDefault()
      this.loginElement.current.hideError()
    }
    const url = `${API_BASE_URL}/login`
    const options = {
      method: 'POST',
      headers: new Headers({
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        username,
        password
      })
    }

    fetch(url, options)
      .then(res => {
        !res.ok 
          ? res.json().then(res => this.loginElement.current.showError(res.error)) 
          : res.json().then(res => TokenService.saveAuthToken(res.authToken))
              .then(res => {
                this.setState({
                    redirect: true
                  })
                }) 
      })
  }

  signOut = () => {
    TokenService.clearAuthToken()
    this.setState({
      redirect: false,
      signedIn: false,
      selected: null,
      progId: null,
      progName: null,
      token: null

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
                <Nav signedIn={TokenService.hasAuthToken()} ref={this.navElement} signOut={this.signOut} />
                {this.redirectToEditor()}
                <Route path='/login' render={(props) => <Login {...props} ref={this.loginElement} signIn={this.signIn} /> }/>
                <Route path='/register' render={(props) => <Register {...props} signIn={this.signIn}  /> } />
                <Route path='/editor'  render={(props) => <Editor {...props} 
                                                              ref={this.editorElement}
                                                              progression={this.state.selected} 
                                                              currentId={this.state.progId} 
                                                              currentName={this.state.progName} 
                                                              signedIn={TokenService.hasAuthToken()} 
                                                              setCurrentProg={this.setCurrentProg} />} />
                <Route path='/saved' render={(props) => <SavedProgressions {...props} 
                                                              loadingTrue={this.startLoading}
                                                              loadingFalse={this.stopLoading}
                                                              loadProgression={this.loadProgression}  />} />   
              </React.Fragment>
          </Switch>
    );
  }
}

export default App;