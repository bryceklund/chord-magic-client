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
                    <p className='instructions'>It's great to have you here. If you already know what you're doing, you can&nbsp;<a href='#'>jump to the bottom</a>&nbsp;to proceed.
                    <br /><span className='tagline'> Chord Magic</span> is a tool to help you build and save chord progressions. It's made up of a <span className='bold'>timeline:</span><img className='timeline_photo' src={require('../introduction/timeline.png')} alt='timline' />and a <span className='bold'>library:</span> 
                     You can move through the timline by using the arrows underneath to scub left/right, or jump to the beginning/end. 
                     Select a chord to view its scale, instrument, and octave. Move </p>
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