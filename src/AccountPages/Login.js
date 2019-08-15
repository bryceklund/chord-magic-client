import React, { Component } from 'react';
import Nav from '../Nav/Nav.js';
import { Link } from 'react-router-dom';
import './Account.css';

class Login extends Component {
    render() {
        let loggedIn = false;
        return (
            <body>
                <Nav loggedIn={loggedIn} />
                <section className='login'>
                    <form className='login_form'>
                        <fieldset>
                        <legend><h3>Login</h3></legend>
                        <label htmlFor='username'>Username:</label>
                        <input type='text' id='username' />
                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' />
                        <button type="submit">Submit</button>
                        </fieldset>
                    </form>
                </section>
            </body>
        );
    }
}

export default Login;