import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';


class Nav extends Component {
    render() {
        console.log(this.props.location)
        const signedInFalse = (<div className='login_links'>
                                    <Link to='/login'>Login</Link>&nbsp;
                                    <Link to='/register'>Register</Link>
                               </div>)
        const signedInTrue = (<div className='login_links'>
                                    <Link to='/logout'>Logout</Link>
                              </div>)
        return (
            <nav>   
                <h1><Link to='/editor'>Chord Magic</Link></h1>
                <Link to='/editor'><img src='' alt='chord magic logo' /></Link>
                {!this.props.loggedIn ? signedInFalse : signedInTrue}
            </nav>
        );
    }
}

export default Nav;