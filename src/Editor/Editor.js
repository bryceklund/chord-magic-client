import React, { Component } from 'react';
import Timeline from './Timeline/Timeline.js';
import Library from './Library/Library.js';

class Editor extends Component {
    render() {
        return (
            <React.Fragment>
                <Timeline />
                <Library />
            </React.Fragment>
        );
    }
}

export default Editor;