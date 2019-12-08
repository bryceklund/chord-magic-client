import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SplashPage.css';

class SplashPage extends Component {
    render() {
        return (
            <main role='main'>
                <header role='banner' className='intro_header'>
                    <h1>Welcome to Chord Magic!</h1>
                    <h2 className='tagline'>Chord progression building streamlined</h2>
                </header>
                <section className="getting_started">
                    <p className='instructions'>It's great to have you here. If you already know what you're doing, you can use one of the buttons below to proceed.
                    Otherwise, check out the <a className='readme_link' href='https://github.com/bryceklund/chord-magic-client/blob/master/README.md' target='_blank'>readme</a> to get started.</p>
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