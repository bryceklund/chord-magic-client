import React, { Component } from 'react';
import Nav from '../Nav/Nav.js';
import { Link } from 'react-router-dom';
import Synth from '../Editor/Synth.js'
import './SavedProgressions.css';

class SavedProgressions extends Component {
    constructor(props) {
        super(props);
        this.editorElement = React.createRef()
        this.state = {
            progressions: {
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
                  ],
            },
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
        this.stopPlayback()
        this.play(this.state.selected)
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
            selected: progression
        })
    }

    componentDidMount() {
        //request to api service to get stored progressions and save them in state
    }

    render() {
        const progs = Object.keys(this.state.progressions).map((p, i) => {
            return <li className='progression'><button className='prog_button' id={p} onClick={(e) => {this.select(this.state.progressions[p], e.target)}}>{p}</button></li>
        })
        return (
            <React.Fragment>
                <Nav signOut={this.props.signOut} signedIn={this.props.signedIn} />
                <section className='library_container'>
                    <div className='library_settings'>
                        <div className='saved_settings'>
                            <button onClick={() => {this.startPlayback()}} className='play_progression'>play</button>
                            <button onClick={() => {this.stopPlayback()}} className='stop_progression'>stop</button>
                            <Link className={`${!this.state.selected ? 'hidden' : ''}`} to='/editor'><button onClick={() => {this.props.loadProgression(this.state.selected)}} className='load_progression'>load</button></Link>
                            <button onClick={() => {/*delete request to server and refresh component*/}} className='delete_progression'>delete</button>
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