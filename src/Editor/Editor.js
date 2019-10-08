import React, { Component } from 'react';
import Timeline from './Timeline/Timeline.js';
import Library from './Library/Library.js';
import Nav from '../Nav/Nav.js';

class Editor extends Component {
    constructor(props) {
        super(props)
        this.timelineElement = React.createRef()
        this.libraryElement = React.createRef()
        this.state = {
            librarySelection: false,
            timelineSelection: false,
            selectedChord: {},
            selectedIndex: null
        }
    }

    loadProgression = () => {
        this.timelineElement.current.loadProgression(this.props.progression)
    }

    setChordIndex = (selectedIndex) => {
        this.setState({
            selectedIndex
        })
    }

    insertChord = () => {
        this.timelineElement.current.insertChord(this.state.selectedIndex, this.state.selectedChord)
        this.libraryElement.current.resetChordSelection()
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
                <Nav signOut={this.props.signOut} signedIn={this.props.signedIn} />
                <Timeline ref={this.timelineElement} progression={this.props.progression} chordSelected={this.toggleTimelineSelection} setIndex={this.setChordIndex} />
                <Library signedIn={this.props.signedIn} selected={this.state.librarySelection} ref={this.libraryElement} insertChord={this.insertChord} chordSelected={this.toggleLibrarySelection} storeChord={this.updateSelectedChord} resetSelection={this.clearSelectedChord} />
            </React.Fragment>
        );
    }
}

export default Editor;