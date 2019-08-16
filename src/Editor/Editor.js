import React, { Component } from 'react';
import Timeline from './Timeline/Timeline.js';
import Library from './Library/Library.js';
import Nav from '../Nav/Nav.js';

class Editor extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <Timeline />
                <Library />
            </React.Fragment>
        );
    }
}

export default Editor;