import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SplashPage.css';

class SplashPage extends Component {
    render() {
        return (
            <main role='main'>
                <header role='banner' className='intro_header'>
                    <h1>Welcome to Chord Wizard!</h1>
                    <h2 className='tagline'>Chord progression building streamlined</h2>
                </header>
                <section className="getting_started">
                    [getting started instructions]
                </section>
                <section className="splash_login_links">
                    <Link to='/login' className='splash_login'>Login</Link>&nbsp;&nbsp;
                    <Link to='/register' className="splash_register">Register</Link><br />
                    <Link to='/editor' className="splash_continue">Continue without an account</Link>
                </section>
            </main>
        );
    }
}

export default SplashPage;