import React, { Component } from 'react';
import Nav from '../Nav/Nav.js';
import { Link } from 'react-router-dom';
import './SavedProgressions.css';

class SavedProgressions extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav signedIn={this.props.signedIn} />
                <section class='library_container'>
                    <div class='library_settings'>
                        <div class='settings'>
                            <button class='play_progression'>play</button>
                            <button class='load_progression'>load</button>
                            <button class='delete_progression'>delete</button>
                            <Link to='/editor' class='back_progression'>back to editor</Link>
                        </div>
                        <div class='saved_library'>
                            <ul class='progressions'>
                                <li class='progression'><button>Progression 1 - G-Bm-C-E</button></li>
                                <li class='progression'><button>Progression 2 - A-Bm-C-D</button></li>
                                <li class='progression'><button>Progression 3 - F#m-D7-C-G</button></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default SavedProgressions;