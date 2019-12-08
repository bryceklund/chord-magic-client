import React, { Component } from 'react'
import Synth from '../Synth.js'
import { API_BASE_URL, API_TOKEN } from '../../config'
import './Library.css'

class Library extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleHidden: false,
            scale: null,
            chord: null,
            octave: 'zero',
            displayOctave: '',
            voice: 'triangle',
            prehear: false,
            newName: '',
            response: ''
        }
    }

    togglePrehear = () => {
      this.setState({
        prehear: !this.state.prehear
      })
    }

    setOct = (oct) => {
      let newOct;
      oct == -2 ? newOct = 'minusTwo' : oct == -1 ? newOct = 'minusOne' : oct == 0 ? newOct = 'zero' : oct == 1 ? newOct = 'one' : oct == 2 ? newOct = 'two' : newOct = 'zero'
      this.setState({
        octave: newOct,
        displayOctave: oct
      }, this.props.storeChord(this.state.voice, oct, this.state.scale, this.state.chord))
    }

    setVoice = (voice) => {
      this.setState({
        voice
      }, this.props.storeChord(voice, this.state.octave, this.state.scale, this.state.chord))
    }

    toggleHidden = (back) => {
        this.setState({
            toggleHidden: !this.state.toggleHidden
        })
        if (back) {
          this.resetScaleSelection()
          this.resetChordSelection()
        }
    }

    toggleSelection = (chord, selection) => {
      if (selection.classList.contains('selected')) {
        this.props.chordSelected()
        this.props.resetSelection()
        this.resetChordSelection()
      } else {
        this.props.chordSelected('active')
        this.props.storeChord(this.state.voice, this.state.octave, this.state.scale, chord)
        this.setState({
              chord
        }, this.highlightSelection(selection, chord))
      }
    }

    resetScaleSelection = () => {
      this.setState({
        scale: null
      })
    }

    resetChordSelection = () => {
      this.setState({
        chord: null,
      })
      const ul = document.getElementsByClassName('chords')[0].children
      Object.keys(ul).forEach(key => {
        ul[key].classList.remove('selected')
      })
    }

    highlightSelection = (selection, chord) => {
      if (this.state.prehear) {
        Synth(this.state.voice, this.state.octave, 1, 0.1, this.state.scale, chord, this.props.context)
      }
      const ul = document.getElementsByClassName('chords')[0].children
      Object.keys(ul).forEach(key => {
        ul[key].classList.remove('selected')
      })
      selection.classList.add('selected')      
    }

    setScale = (scale) => {
        this.toggleHidden()
        this.setState({
            scale: scale.toLowerCase()
        })
    }

    setChord = (chord, target) => {
        this.setState({
            chord
        },  this.highlightSelection(target))
    }

    setNewName = (name) => {
      this.setState({
        newName: name
      })
    }

    showUpdateTooltip = () => {
      document.getElementById('update_tooltip').classList.remove('hidden')
    }

    showSaveNewTooltip = () => {
      document.getElementById('new_save_tooltip').classList.remove('hidden')
    }  

    hideTooltip = () => {
      document.getElementById('new_save_tooltip').classList.add('hidden')
      document.getElementById('update_tooltip').classList.add('hidden')
    }

    checkIfNew = () => {
      if (this.props.currentName) {
        this.showUpdateTooltip()
      } else {
        this.showSaveNewTooltip()
      }
    }

    saveSuccess = () => {
      this.hideTooltip()
      this.setState({
          response: 'Progression saved!'
      })
        document.getElementById('response').classList.remove('hidden')
        setTimeout(function() {
          try {
            document.getElementById('response').classList.add('hidden')
          } catch {}
        }, 3000)
    }

    saveFail = () => {
      this.hideTooltip()
      this.setState({
          response: 'Progression failed to save.'
      })
        document.getElementById('response').classList.remove('hidden')
        setTimeout(function() {
          try {
            document.getElementById('response').classList.add('hidden')
          } catch {}
        }, 3000)
    }


    render() {
        return (
            <section className='library_container'>
            <div className='library_settings'>
                <div className='settings'>
                  <div className='oct_ins_pre'>
                    <div className='prehear_container'>
                      <input onChange={() => this.togglePrehear()} className='prehear' id='prehear' type="checkbox" />
                      <label className='prehear_label' htmlFor='prehear'>prehear</label>
                    </div>
                    <div className='instrument_container'>
                      instrument
                      <div className='wave_icons_container'>
                        <div className='sine_triangle'>
                          <label>
                            <input onClick={(e) => this.setVoice(e.target.value)} type='radio' name='voice' value='sine' />
                            <img className='wave_icon' src={require('../../icons/sine.png')} />
                          </label>
                          <label>
                            <input onClick={(e) => this.setVoice(e.target.value)} type='radio' name='voice' value='triangle' defaultChecked />
                            <img className='wave_icon' src={require('../../icons/triangle.png')} />
                          </label>
                        </div>
                        <div  className='saw_square'>
                          <label>
                            <input onClick={(e) => this.setVoice(e.target.value)} type='radio' name='voice' value='sawtooth' />
                            <img className='wave_icon' src={require('../../icons/sawtooth.png')} />
                          </label>
                          <label>
                            <input onClick={(e) => this.setVoice(e.target.value)} type='radio' name='voice' value='square' />
                            <img className='wave_icon' src={require('../../icons/square.png')} />
                          </label>
                        </div>
                      </div>

                      {/*<label className='instrument_label' htmlFor='instrument'>instrument:</label>
                      <select onChange={(e) => this.setVoice(e.target.value)} defaultValue='triangle' className='instrument' id='instrument'>
                        <option value='sine'><img className='wave_icon' src={require('../../icons/sine.png')} alt='sine wave' /></option>
                        <option value='triangle'>triangle</option>
                        <option value='square'>square</option>
                        <option value='sawtooth'>saw</option>
                      </select>*/}
                    </div>
                    <div className='octave_container'>
                      <label htmlFor='octave'>octave: {this.state.displayOctave || 0}</label><br />
                      <input name="octave" className="octave" type="range" onChange={(e) => this.setOct(e.target.value)} min="-2" max="2" defaultValue="0" />
                    </div>
                  </div>
                  <button disabled={!this.props.selected} onClick={() => this.props.insertChord()} className='insert_chord'>insert chord</button>
                {this.props.signedIn 
                    ? <button onClick={() => this.checkIfNew()} className='save_progression'>save progression</button>
                    : <p className='login_message'>Log in to save your progression!</p>}
                <div className='new_save_tooltip response hidden' id='response'>{this.state.response}</div>
                <div className='update_tooltip hidden' id='update_tooltip'>

                    <button onClick={() => this.showSaveNewTooltip()} className='save'>Save as new</button><button onClick={() => this.props.saveExisting()} className='save'>Overwrite existing</button><button className='save' onClick={() => this.hideTooltip()} >Cancel</button>

                </div>
                <div className='new_save_tooltip hidden' id='new_save_tooltip'>
                  <label htmlFor='prog_name'>Name:</label>
                  <input onChange={(e) => this.setNewName(e.target.value)} type='text' id='prog_name' />
                  <div className='save_cancel'>
                    <button onClick={() => this.props.saveNew(this.state.newName)} className='save'>Save</button><button className='save' onClick={() => this.hideTooltip()}>Cancel</button>
                  </div>
                </div>
              </div>
              <div className='library'>
                  <button className={`back ${!this.state.toggleHidden ? 'hidden' : ''}`} onClick={() => this.toggleHidden('back')}>&lt; back to scales</button>
                <ul className={`scales ${this.state.toggleHidden ? 'hidden' : ''}`}>
                    <li className='scale maj' onClick={(e) => this.setScale(e.target.textContent)}>Maj</li>
                    <li className='scale min' onClick={(e) => this.setScale(e.target.textContent)}>Min</li>
                    <li className='scale maj7' onClick={(e) => this.setScale(e.target.textContent)}>Maj7</li>
                    <li className='scale min7' onClick={(e) => this.setScale(e.target.textContent)}>Min7</li>
                    <li className='scale dim' onClick={(e) => this.setScale(e.target.textContent)}>Dim</li>
                    <li className='scale dom7' onClick={(e) => this.setScale(e.target.textContent)}>Dom7</li>
                    <li className='scale sus2' onClick={(e) => this.setScale(e.target.textContent)}>Sus2</li>
                    <li className='scale sus4' onClick={(e) => this.setScale(e.target.textContent)}>Sus4</li>
                    <li className='scale aug' onClick={(e) => this.setScale(e.target.textContent)}>Aug</li>
                </ul>
                <ul className={`chords ${!this.state.toggleHidden ? 'hidden' : ''}`}>
                    <li className={`note a ${this.state.scale ? this.state.scale : ''}`} onClick={(e) => this.toggleSelection(e.target.textContent, e.target)}>A</li>
                    <li className={`note bb ${this.state.scale ? this.state.scale : ''}`} onClick={(e) => this.toggleSelection(e.target.textContent, e.target)}>Bb</li>
                    <li className={`note b ${this.state.scale ? this.state.scale : ''}`} onClick={(e) => this.toggleSelection(e.target.textContent, e.target)}>B</li>
                    <li className={`note c ${this.state.scale ? this.state.scale : ''}`} onClick={(e) => this.toggleSelection(e.target.textContent, e.target)}>C</li>
                    <li className={`note db ${this.state.scale ? this.state.scale : ''}`} onClick={(e) => this.toggleSelection(e.target.textContent, e.target)}>Db</li>
                    <li className={`note d ${this.state.scale ? this.state.scale : ''}`} onClick={(e) => this.toggleSelection(e.target.textContent, e.target)}>D</li>
                    <li className={`note eb ${this.state.scale ? this.state.scale : ''}`} onClick={(e) => this.toggleSelection(e.target.textContent, e.target)}>Eb</li>
                    <li className={`note e ${this.state.scale ? this.state.scale : ''}`} onClick={(e) => this.toggleSelection(e.target.textContent, e.target)}>E</li>
                    <li className={`note f ${this.state.scale ? this.state.scale : ''}`} onClick={(e) => this.toggleSelection(e.target.textContent, e.target)}>F</li>
                    <li className={`note gb ${this.state.scale ? this.state.scale : ''}`} onClick={(e) => this.toggleSelection(e.target.textContent, e.target)}>Gb</li>
                    <li className={`note g ${this.state.scale ? this.state.scale : ''}`} onClick={(e) => this.toggleSelection(e.target.textContent, e.target)}>G</li>
                    <li className={`note ab ${this.state.scale ? this.state.scale : ''}`} onClick={(e) => this.toggleSelection(e.target.textContent, e.target)}>Ab</li>
                </ul>
              </div>
      
            </div>
          </section>
      
        );
    }
}

export default Library;