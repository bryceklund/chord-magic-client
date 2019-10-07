import React, { Component } from 'react';
import Timeline from './Timeline/Timeline.js';
import Library from './Library/Library.js';
import Nav from '../Nav/Nav.js';

class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            librarySelection: false,
            timelineSelection: false,
            selectedChord: {},
            selectedIndex: null
        }
    }

    setChordIndex = (selectedIndex) => {
        this.setState({
            selectedIndex
        })
    }

    insertChord = () => {

    }

    toggleLibrarySelection = (active) => {
        console.log(active)
        if (active) {
            this.setState({
                librarySelection: true
            })
        } else {
            this.setState({
                librarySelection: false
            })
        }
    }

    toggleTimelineSelection = () => {
        this.setState({
            timelineSelection: !this.state.timelineSelection
        })
    }

    updateSelectedChord = (voice, oct, scale, name) => {
        this.setState({
            selectedChord: {
                name,
                scale,
                oct,
                voice
            }
        })
    }

    clearSelectedChord = () => {
        this.setState({
            selectedChord: {}
        })
    }

    render() {
        return (
            <React.Fragment>
                <Nav />
                <Timeline chordSelected={this.toggleTimelineSelection} setIndex={this.setChordIndex} />
                <Library insertChord={this.insertChord} chordSelected={this.toggleLibrarySelection} storeChord={this.updateSelectedChord} resetSelection={this.clearSelectedChord} />
            </React.Fragment>
        );
    }
}

export default Editor;