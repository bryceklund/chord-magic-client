import React, { Component } from 'react';
import Nav from '../Nav/Nav.js';
import { Link } from 'react-router-dom';
import Synth from '../Editor/Synth.js'
import { API_BASE_URL, API_TOKEN } from '../config'
import './SavedProgressions.css';

/*progressions: {
  'Nice one': [
      {
        id: 0,
        name: 'B',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'triangle',
        active: false
      }, 
      {
        id: 1,
        name: 'G',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'triangle',
        active: false
      }, 
      {
        id: 2,
        name: 'A',
        scale: 'min',
        oct: 'minusTwo',
        voice: 'sawtooth',
        active: false
      }, 
      {
        id: 3,
        name: 'D',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'square',
        active: false
      }, 
      {
        id: 4,
        name: 'G',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'triangle',
        active: false
      }, 
      {
        id: 5,
        name: 'B',
        scale: 'min',
        oct: 'minusTwo',
        voice: 'triangle',
        active: false
      }, 
      {
        id: 6,
        name: 'C',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'square',
        active: false
      }
    ],
  'Minor one': [
      {
        id: 0,
        name: 'G',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'triangle',
        active: false
      }, 
      {
        id: 1,
        name: 'B',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'triangle',
        active: false
      }, 
      {
        id: 2,
        name: 'E',
        scale: 'min',
        oct: 'minusTwo',
        voice: 'sawtooth',
        active: false
      }, 
      {
        id: 3,
        name: 'C',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'square',
        active: false
      }, 
      {
        id: 4,
        name: 'G',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'triangle',
        active: false
      }, 
      {
        id: 5,
        name: 'B',
        scale: 'min',
        oct: 'minusTwo',
        voice: 'triangle',
        active: false
      }, 
      {
        id: 6,
        name: 'C',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'square',
        active: false
      }
    ],
  'Metal one': [
      {
        id: 0,
        name: 'G',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'triangle',
        active: false
      }, 
      {
        id: 1,
        name: 'B',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'triangle',
        active: false
      }, 
      {
        id: 2,
        name: 'E',
        scale: 'min',
        oct: 'minusTwo',
        voice: 'sawtooth',
        active: false
      }, 
      {
        id: 3,
        name: 'C',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'square',
        active: false
      }, 
      {
        id: 4,
        name: 'G',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'triangle',
        active: false
      }, 
      {
        id: 5,
        name: 'B',
        scale: 'min',
        oct: 'minusTwo',
        voice: 'triangle',
        active: false
      }, 
      {
        id: 6,
        name: 'C',
        scale: 'maj',
        oct: 'minusTwo',
        voice: 'square',
        active: false
      }
    ],*/

class SavedProgressions extends Component {
    constructor(props) {
        super(props);
        this.editorElement = React.createRef()
        this.state = {
            progressions: [],
            selected: null,
            playback: []
        }
    }
    
    stopPlayback = () => {
        for (let i = 0; i < this.state.playback.length; i++) {
          clearTimeout(this.state.playback[i])
        }
      }
  
    startPlayback = () => {
      const progression = this.state.progressions.find(p => p.id === this.state.selected).chords
      this.stopPlayback()
      this.play(progression)
    }

    play = (progression) => {
        let counter = 0
        let playback = []

        while (counter < progression.length) {
            progression.forEach((chord, i) => {
            playback[i] = setTimeout(function() {
                Synth(chord.voice, chord.oct, 2, .1, chord.scale, chord.name)}, i * (2 * 1000))
                counter++
            })
        }
        this.setState({
            playback
        })      
    }
  
    unhighlightAll = () => {
        let progs = document.getElementsByClassName('prog_button')
        Object.keys(progs).map(e => progs[e].classList.remove('highlighted'))
    }

    select = (progression, target) => {
        this.stopPlayback()
        this.unhighlightAll()
        target.classList.toggle('highlighted')
        this.setState({
            selected: progression.id
        })
    }

    setProgList = (progs) => {
      this.setState({
        progressions: progs
      })
    }

    setChords = (chordList, index) => {
      const tempArr = this.state.progressions

      tempArr[index].chords = chordList
      this.setState({
        progressions: tempArr
      })
    }

    deleteProgression = () => {
      const url = `${API_BASE_URL}/progressionchords/${this.state.selected}`
      const options = {
        method: 'DELETE',
        headers: new Headers({
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        })
      }
      fetch(url, options)
        .then(res => {
          if (res.ok) {
            this.unhighlightAll()
            const newProgs = this.state.progressions.filter(prog => prog.id !== this.state.selected)
            this.setState({
              progressions: newProgs,
              selected: null
            })
          } else {
            console.log('failed to delete')
          }
        })
    }

    componentDidMount() {
      const progsUrl = `${API_BASE_URL}/progressions/${this.props.userid || '001'}`
      const options = {
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        })
      }
      fetch(progsUrl, options)
        .then(result => result.json())
        .then(data => this.setProgList(data))
        .then(data => {
          this.state.progressions.forEach((p, i) => {
            fetch(`${API_BASE_URL}/progressionchords/${p.id}`, options)
              .then(result => result.json())
              .then(data => this.setChords(data, i))
          })
        })
        // add catches + error handling here
      }
    render() {
        const progs = this.state.progressions.map((p, i) => {
            return <li className='progression'><button className='prog_button' id={p.id} onClick={(e) => {this.select(p, e.target)}}>{p.name}</button></li>
        })
        return (
            <React.Fragment>
                <Nav signOut={this.props.signOut} signedIn={this.props.signedIn} />
                <section className='library_container'>
                    <div className='library_settings'>
                        <div className='saved_settings'>
                            <button onClick={() => {this.startPlayback()}} className='play_progression'>play</button>
                            <button onClick={() => {this.stopPlayback()}} className='stop_progression'>stop</button>
                            <Link className={`${!this.state.selected ? 'hidden' : ''}`} to='/editor'><button onClick={() => {this.props.loadProgression(this.state.progressions.find(prog => prog.id === this.state.selected))}} className='load_progression'>load</button></Link>
                            <button onClick={() => {this.deleteProgression()}} className={`delete_progression ${!this.state.selected ? 'hidden' : ''}`}>delete</button>
                            <Link to='/editor' className='back_progression'><button>back to editor</button></Link>
                        </div>
                        <div className='saved_library'>
                            <ul className='progressions'>
                                {progs}
                            </ul>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default SavedProgressions;