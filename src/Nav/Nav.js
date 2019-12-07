import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';


class Nav extends Component {
    render() {
        const signedInFalse = (<div className='login_links'>
                                    <span><Link className='login_link' to='/login'>Login</Link>&nbsp;|&nbsp;</span>
                                    <Link className='login_link' to='/register'>Register</Link>
                               </div>)
        const signedInTrue = (<div className='loggedin_links'>
                                    <span><Link className='login_link' to='/saved'>My Progressions</Link>&nbsp;</span>
                                    <Link className='login_link' to='/editor'><button onClick={this.props.signOut} className='logout'>Logout</button></Link>
                              </div>)
        return (
            <nav>   
                <h1><Link className='hero' to='/editor'>Chord Magic</Link></h1>
                <Link className='logo_container' to='/editor'><img className='logo' src={require('../icons/chord-magic-logo.png')} alt='chord magic logo' /></Link>
                {!this.props.signedIn ? signedInFalse : signedInTrue}
            </nav>
        );
    }
}

export default Nav;