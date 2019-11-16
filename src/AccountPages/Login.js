import React, { Component } from 'react';
import Nav from '../Nav/Nav.js';
import { Link } from 'react-router-dom';
import './Account.css';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null,
            error: ''
        }
    }

    setUser = (username) => {
        this.setState({
            username
        })
    }

    setPass = (password) => {
        this.setState({
            password
        })
    }

    showError = (error) => {
        this.setState({
            error
        }, () => document.getElementById('error').classList.remove('hidden'))
    }

    hideError = () => {
        this.setState({
            error: ''
        }, () => document.getElementById('error').classList.add('hidden'))
    }

    render() {
        return (
            <React.Fragment>
                <section className='login'>
                    <form className='login_form' onSubmit={(e) => this.props.signIn(this.state.username, this.state.password, e)}>
                        <fieldset>
                        <legend><h3>Login</h3></legend>
                        <label htmlFor='username'>Username:</label>
                        <input type='text' id='username' onChange={(e) => this.setUser(e.target.value)} />
                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' onChange={(e) => this.setPass(e.target.value)} />
                        <button type="submit" disabled={!(this.state.username && this.state.password)}>Submit</button>
                        </fieldset>
                    </form>
                    <p id='error' className='error hidden'>{this.state.error}</p>
                </section>
            </React.Fragment>
        );
    }
}

export default Login;