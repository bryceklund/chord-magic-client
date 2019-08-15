import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav.js';
import './Account.css';

class Register extends Component {
    render() {
        return (
            <body>
                <Nav />
                <section className='login'>
                    <form className='login_form'>
                        <fieldset>
                        <legend><h3>Register</h3></legend>
                        <label htmlFor='username'>Desired Username:</label>
                        <input type='text' id='username' />
                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' />
                        <label htmlFor='password'>Repeat Password:</label>
                        <input type='password' id='password' />
                        <button type="submit">Submit</button>
                        </fieldset>
                    </form>
                </section>
            </body>
        );
    }
}

export default Register;