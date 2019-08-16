import React, { Component } from 'react';
import Timeline from './Timeline/Timeline.js.js';
import Library from './Library/Library.js.js';

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