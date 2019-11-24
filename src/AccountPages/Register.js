import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, API_TOKEN } from '../config'
import Nav from '../Nav/Nav.js';
import './Account.css';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: true,
            username: '',
            password: ''
        }
    }

    setUsername = (username) => {
        this.setState({
            username,
            error: false
        })
    } 

    validateSecondPass = (password) => {
        const correctPass = document.getElementById('password_one').value
        if (password !== correctPass) {
            this.setState({
                error: 'Both passwords must match!'
            })
        } else {
            this.setState({
                error: null
            })
        }
    }

    validateFirstPass = (password) => {
        if (!password.match(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
            this.setState({
                error: 'Password must be at least eight characters and contain a number and an uppercase letter!'
            })
        } else {
            this.setState({
                error: null
            })
        }
    }
    

    postUser = (e) => {
        e.preventDefault()
        const { username, password } = this.state
        const url = `${API_BASE_URL}/users`
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
                if (!res.ok) {
                    this.setState({
                        error: res.error
                    })
                } else {
                    this.props.signIn(username, password)
                }
            })
            .catch(error => console.log('error: ', error))
    }

    render() {
        return (
            <React.Fragment>
                <Nav />
                <section className='login'>
                    <form className='login_form' onSubmit={(e) => this.postUser(e)} >
                        <fieldset>
                        <legend><h3>Register</h3></legend>
                        <label htmlFor='username'>Desired Username:</label>
                        <input onChange={e => this.setUsername(e.target.value)} type='text' id='username' />
                        <label htmlFor='password'>Password:</label>
                        <input onChange={(e) => this.validateFirstPass(e.target.value)} type='password' id='password_one' />
                        <label htmlFor='password'>Repeat Password:</label>
                        <input onChange={(e) => this.validateSecondPass(e.target.value)} type='password' id='password' />
                        <p className={`error ${this.state.error ? '' : 'hidden'}`}>{this.state.error}</p>
                        <button disabled={this.state.error} type="submit">Submit</button>
                        </fieldset>
                    </form>
                </section>
            </React.Fragment>
        );
    }
}

export default Register;