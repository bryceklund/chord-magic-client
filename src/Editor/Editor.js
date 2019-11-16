import React, { Component } from 'react'
import Timeline from './Timeline/Timeline.js'
import Library from './Library/Library.js'
import { API_BASE_URL, API_TOKEN } from '../config'
import './Editor.css'
import TokenService from '../services/tokenService.js'

class Editor extends Component {
    constructor(props) {
        super(props)
        this.timelineElement = React.createRef()
        this.libraryElement = React.createRef()
        this.state = {
            librarySelection: false,
            timelineSelection: false,
            selectedChord: {},
            selectedIndex: null,
            response: ''
        }
    }

    refresh = () => {
        this.forceUpdate()
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
        this.setState({
            selectedChord: {},
            selectedIndex: null,
            librarySelection: false
        })
    }

    toggleLibrarySelection = (active) => {
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

    toggleTimelineSelection = (active) => {
        if (active) {
            this.setState({
                timelineSelection: true
            })
        } else {
            this.setState({
                timelineSelection: false
            })
        }
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

    saveNew = (name) => {
        const chords = this.timelineElement.current.state.activeChords.map((chord, i) => chord = {...chord, id: i})
        const url = `${API_BASE_URL}/progressions/saved`
        const options = {
          method: 'POST',
          headers: new Headers({
            'Authorization': `Bearer ${API_TOKEN} ${TokenService.getAuthToken()}`,
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            name: name,
            chords
          })
        }
        let id
        //post to db
        fetch(url, options)
            .then(res => res.text())
            .then(res => {
                if (res.length) {
                    this.libraryElement.current.saveSuccess()
                    id = res
                } else {
                    this.libraryElement.current.saveFail()
                }
            })
            .then(res => this.props.setCurrentProg(name, id))
      }

      saveExisting = () => {
        const chords = this.timelineElement.current.state.activeChords.map((chord, i) => chord = {...chord, id: i})
        const id = this.props.currentId
        const url = `${API_BASE_URL}/progressionchords/${id}`
        const options = {
          method: 'PATCH',
          headers: new Headers({
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            chords
          })
        }
        fetch(url, options)
            .then(res => {
                if (res.ok) {
                    this.libraryElement.current.saveSuccess()
                } else {
                    this.libraryElement.current.saveFail()
                }
            })
            
      }

    render() {
        return (
            <React.Fragment>
                <Timeline ref={this.timelineElement} currentName={this.props.currentName} progression={this.props.progression} chordSelected={this.toggleTimelineSelection} setIndex={this.setChordIndex} />
                <Library 
                    setProgName={this.props.setProgName} 
                    signedIn={this.props.signedIn} 
                    saveNew={this.saveNew}
                    saveExisting={this.saveExisting}
                    currentName={this.props.currentName} 
                    selected={this.state.librarySelection} 
                    ref={this.libraryElement} 
                    insertChord={this.insertChord} 
                    chordSelected={this.toggleLibrarySelection} 
                    storeChord={this.updateSelectedChord} 
                    resetSelection={this.clearSelectedChord} />
            </React.Fragment>
        );
    }
}

export default Editor;