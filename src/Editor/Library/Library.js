import React, { Component } from 'react';
import '../Synth.js'
import './Library.css'

class Library extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleHidden: false,
            scale: null,
            chord: null,
            octave: null,
            voice: null,
        }
    }

    toggleHidden = () => {
        this.setState({
            toggleHidden: !this.state.toggleHidden
        })
    }

    highlightSelection = (selection) => {
        console.log('highlightSelection running')
        console.log(this.state.chord)
        console.log(selection.textContent)
        console.log(this.state)
        if (selection.textContent === this.state.chord) {
            console.log('highlighting selection')
            selection.classList.add('selected')
            this.forceUpdate()
        }
    }

    setScale = (scale) => {
        this.toggleHidden()
        console.log(this.state.scale)
        this.setState({
            scale: scale.toLowerCase()
        })
    }

    setChord = (chord, target) => {
        this.setState({
            chord
        },  this.highlightSelection(target))
    }

    render() {
        return (
            <section className='library_container'>
            <div className='library_settings'>
                <div className='settings'>
                  <div className='oct_ins_pre'>
                    <div className='prehear_container'>
                      <input className='prehear' id='prehear' type="checkbox" />
                      <label className='prehear_label' htmlFor='prehear'>prehear</label>
                    </div>
                    <div className='instrument_container'>
                      <label className='instrument_label' htmlFor='instrument'>instrument:</label>
                      <select className='instrument' id='instrument'>
                        <option value='sine'>sine</option>
                        <option value='triangle'>triangle</option>
                        <option value='square'>square</option>
                        <option value='saw'>saw</option>
                      </select>
                    </div>
                    <div className='octave_container'>
                      <label htmlFor='octave'>octave</label><br />
                      <div className='octave_div'>
                        <label htmlFor='-2'>-2</label>
                        <input type='radio' name='octave' value='-2' id='-2' />
                      </div>
                      <div className='octave_div'>
                        <label htmlFor='-1'>-1</label>
                        <input type='radio' name='octave' value='-1' id='-1' />
                      </div>
                      <div className='octave_div'>
                        <label htmlFor='0'>0</label>
                        <input type='radio' name='octave' value='0' id='0' />
                      </div>
                      <div className='octave_div'>
                        <label htmlFor='1'>1</label>
                        <input type='radio' name='octave' value='1' id='1' />
                      </div>
                      <div className='octave_div'>
                        <label htmlFor='2'>2</label>
                        <input type='radio' name='octave' value='2' id='2' />
                      </div>
                    </div>
                  </div>
                <p className='login_message'>Login to save your progression!</p>
                <button className='save_progression hidden'>save progression</button>
      
              </div>
              <div className='library'>
                  <button class={`back ${!this.state.toggleHidden ? 'hidden' : ''}`} onClick={() => this.toggleHidden()}>&lt; back to scales</button>
                <ul className={`scales ${this.state.toggleHidden ? 'hidden' : ''}`}>
                    <li className='scale' onClick={(e) => this.setScale(e.target.textContent)}>Maj</li>
                    <li className='scale' onClick={(e) => this.setScale(e.target.textContent)}>Min</li>
                    <li className='scale' onClick={(e) => this.setScale(e.target.textContent)}>Maj7</li>
                    <li className='scale' onClick={(e) => this.setScale(e.target.textContent)}>Min7</li>
                    <li className='scale' onClick={(e) => this.setScale(e.target.textContent)}>Dim</li>
                    <li className='scale' onClick={(e) => this.setScale(e.target.textContent)}>Dom7</li>
                    <li className='scale' onClick={(e) => this.setScale(e.target.textContent)}>Sus2</li>
                    <li className='scale' onClick={(e) => this.setScale(e.target.textContent)}>Sus4</li>
                    <li className='scale' onClick={(e) => this.setScale(e.target.textContent)}>Aug</li>
                </ul>
                <ul className={`scales chords ${!this.state.toggleHidden ? 'hidden' : ''}`}>
                    <li className='scale' onClick={(e) => this.setChord(e.target.textContent, e.target)}>A</li>
                    <li className='scale' onClick={(e) => this.setChord(e.target.textContent, e.target)}>Bb</li>
                    <li className='scale' onClick={(e) => this.setChord(e.target.textContent, e.target)}>B</li>
                    <li className='scale' onClick={(e) => this.setChord(e.target.textContent, e.target)}>C</li>
                    <li className='scale' onClick={(e) => this.setChord(e.target.textContent, e.target)}>C#</li>
                    <li className='scale' onClick={(e) => this.setChord(e.target.textContent, e.target)}>D</li>
                    <li className='scale' onClick={(e) => this.setChord(e.target.textContent, e.target)}>Eb</li>
                    <li className='scale' onClick={(e) => this.setChord(e.target.textContent, e.target)}>E</li>
                    <li className='scale' onClick={(e) => this.setChord(e.target.textContent, e.target)}>F</li>
                    <li className='scale' onClick={(e) => this.setChord(e.target.textContent, e.target)}>F#</li>
                    <li className='scale' onClick={(e) => this.setChord(e.target.textContent, e.target)}>G</li>
                    <li className='scale' onClick={(e) => this.setChord(e.target.textContent, e.target)}>Ab</li>
                </ul>
              </div>
      
            </div>
          </section>
      
        );
    }
}

export default Library;