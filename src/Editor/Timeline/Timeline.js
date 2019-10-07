import React, { Component } from 'react';
import Synth from '../Synth.js'
import './Timeline.css';

class Timeline extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeChords: [
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
        timelineChords: ['', '', '', ''],
        init: 0,
        end: 4,
        currentCell: null,
        playback: [],
        speed: 1.5,
        volume: 0.1,
        bpm: 160,
        displayVolume: 25
      }
    }

    setSpeed = (speed) => {
      this.setState({
        speed: speed / 20,
        bpm: Math.floor(240 / (speed / 20))
      })
    }

    setVolume = (volume) => {
      this.setState({
        volume: volume / 400,
        displayVolume: volume
      })
    }

    stopPlayback = () => {
      for (let i = 0; i < this.state.playback.length; i++) {
        clearTimeout(this.state.playback[i])
      }
    }

    startPlayback = () => {
      this.stopPlayback()
      this.play()
    }

    play = () => {
      this.setTimelineChords()
      const duration = this.state.speed
      const volume = this.state.volume
      const updateComponent = this.setTimelineChords.bind()
      const playChord = this.setActiveCell.bind()
      let counter = 0
      let playback = []

      while (counter < this.state.activeChords.length) {
        this.state.activeChords.forEach((chord, i) => {
          playback[i] = setTimeout(function() {
            playChord(chord.id)
            updateComponent()
            Synth(chord.voice, chord.oct, duration, volume, chord.scale, chord.name)}, i * (duration * 1000))
            counter++
        })
      }
      this.setState({
        playback
      })      
    }

    incrementTimeline = () => {
      if (this.state.timelineChords.length > 3) {
        this.setState({
          init: this.state.init += 1,
          end: this.state.end += 1
        })
        this.setTimelineChords()
      }
    }

    decrementTimeline = () => {
        if (this.state.init > 0) {
          this.setState({
            init: this.state.init -= 1,
            end: this.state.end -= 1
          })
          this.setTimelineChords()
        }
    }

    setTimelineChords = () => {
      this.setState({
        timelineChords: this.state.activeChords.slice(this.state.init, this.state.end)
      })
    }

    removeChord = (id) => {
      this.setState({
        activeChords: this.state.activeChords.filter(chord => chord.id !== id)
      }, () => this.setTimelineChords())

    }

    swapChords = (a, b) => {
      const temp = this.state.activeChords[a]
      const tempArr = this.state.activeChords
      tempArr[a] = tempArr[b]
      tempArr[b] = temp
      this.setTimelineChords()
    }

    toggleActiveChord = (id) => {
      if (!this.state.activeChords.find(chord => chord.id === id).active) {
        this.props.chordSelected('active')
        this.props.setIndex(this.state.activeChords.indexOf(this.state.activeChords.find(chord => chord.id === id)))
        this.setActiveCell(id)
      } else {
        this.props.chordSelected()
        this.setInactiveCell(id)
      }
    }

    setInactiveCell = (id) => {
      this.setState(prevState => ({
        activeChords: prevState.activeChords.map(chord => chord.active === true ? {...chord, active: false}: chord)
      }), this.setActiveCell())

    }

    setActiveCell = (id) => {
      let init = this.state.init
      let end = this.state.end
      this.state.activeChords.map((chord, idx) => {
        if (chord.id === id) {
          chord.active = true
          if (idx === end) {
            this.incrementTimeline()
          } else if (idx < init) {
            this.setState({
              init: 0,
              end: 4
            })
          }
        } else {
          chord.active = false
        }
      })
      this.setState({
        currentCell: id
      }, () => this.setTimelineChords())
    }

    componentDidMount() {
      this.setTimelineChords()
    }  

    render() {
        return (
            <section className='timeline'>
            <div className='play_stop_buttons'>
              <button onClick={() => this.startPlayback()}><img src='' alt='play button' /></button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={() => this.stopPlayback()}><img src='' alt='stop button' /></button>
            </div>
            <div className='player_timeline'>

            <div className={`chord_box one`}>
                {this.state.timelineChords[0]
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.timelineChords[0].id)}>X</button> 
                  : null}
                <span onClick={() => this.toggleActiveChord(this.state.timelineChords[0].id)} 
                    className={`chord_label ${this.state.timelineChords[0] && this.state.timelineChords[0].active 
                                              ? 'highlighted' 
                                              : ''}`}>
                  {this.state.timelineChords[0]
                    ? this.state.timelineChords[0].name + this.state.timelineChords[0].scale 
                    : '+'}
                </span>
                {this.state.timelineChords[0]
                  ? (<div className='move_chord_buttons'>
                    {this.state.init > 0 
                      ? <button className='move_chord_left' onClick={() => this.swapChords(this.state.init, this.state.init - 1)}><img src='' alt='move left' /></button>
                      : null}
                    {this.state.timelineChords[1]
                      ? <button className='move_chord_right' onClick={() => this.swapChords(this.state.init, this.state.init + 1)}><img src='' alt='move right' /></button>
                      : null}
                    </div>)
                : null}
            </div>

            <div className={`chord_box two`}>
                {this.state.timelineChords[1] 
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.timelineChords[1].id)}>X</button> 
                  : null}
                <span onClick={() => this.toggleActiveChord(this.state.timelineChords[1].id)} 
                  className={`chord_label ${this.state.timelineChords[1] && this.state.timelineChords[1].active  
                                              ? 'highlighted' 
                                              : ''}`}>
                  {this.state.timelineChords[1] 
                    ? this.state.timelineChords[1].name + this.state.timelineChords[1].scale 
                    : this.state.timelineChords[0] 
                    ? '+' 
                    : null}
                </span>
                {this.state.timelineChords[1]
                  ? (<div className='move_chord_buttons'>
                      <button className='move_chord_left' onClick={() => this.swapChords(this.state.init + 1, this.state.init)}><img src='' alt='move left' /></button>
                    {this.state.timelineChords[2]
                      ? <button className='move_chord_right' onClick={() => this.swapChords(this.state.init + 1, this.state.init + 2)}><img src='' alt='move right' /></button>
                      : null}
                    </div>)
                : null}
            </div>

            <div className='chord_box three'>
                {this.state.timelineChords[2] 
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.timelineChords[2].id)}>X</button> 
                  : null}
                <span onClick={() => this.toggleActiveChord(this.state.timelineChords[2].id)} 
                  className={`chord_label ${this.state.timelineChords[2] && this.state.timelineChords[2].active 
                                              ? 'highlighted' 
                                              : ''}`}>
                  {this.state.timelineChords[2] 
                    ? this.state.timelineChords[2].name + this.state.timelineChords[2].scale
                    : this.state.timelineChords[1] 
                    ? '+' 
                    : null}
                </span>
                {this.state.timelineChords[2]
                  ? (<div className='move_chord_buttons'>
                      <button className='move_chord_left' onClick={() => this.swapChords(this.state.init + 2, this.state.init + 1)}><img src='' alt='move left' /></button>
                    {this.state.timelineChords[3]
                      ? <button className='move_chord_right' onClick={() => this.swapChords(this.state.init + 2, this.state.init + 3)}><img src='' alt='move right' /></button>
                      : null}
                    </div>)
                : null}
              </div>

              <div className='chord_box four'>
                {this.state.timelineChords[3] 
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.timelineChords[3].id)}>X</button> 
                  : null}
                <span onClick={() => this.toggleActiveChord(this.state.timelineChords[3].id)} 
                  className={`chord_label ${this.state.timelineChords[3] && this.state.timelineChords[3].active
                                              ? 'highlighted' 
                                              : ''}`}>
                  {this.state.timelineChords[3] 
                    ? this.state.timelineChords[3].name + this.state.timelineChords[3].scale
                    : this.state.timelineChords[2] 
                    ? '+' 
                    : null}
                </span>
                {this.state.timelineChords[3]
                  ? (<div className='move_chord_buttons'>
                      <button className='move_chord_left' onClick={() => this.swapChords(this.state.init + 3, this.state.init + 2)}><img src='' alt='move left' /></button>
                    {this.state.activeChords[this.state.end]
                      ? <button className='move_chord_right' onClick={() => this.swapChords(this.state.init + 3, this.state.init + 4)}><img src='' alt='move right' /></button>
                      : null}
                    </div>)
                : null}
              </div>
            </div>

            <div className='scrubber_buttons'>
              <button onClick={() => this.decrementTimeline()}><img src='' alt='scrub left' /></button>
              <div className="slide_container">
                <label htmlFor='volume'>Volume: {this.state.displayVolume}%</label>
                <input type="range" min="0" max="100" defaultValue="25" className="volume_slider" id="volume" 
                  onChange={(e) => this.setVolume(e.target.value)} />
              </div>
              <div className="slide_container">
                <label htmlFor='speed'>Speed: {this.state.bpm} BPM</label>
                <input type="range" min="1" max="100" defaultValue="30" className="speed_slider" id="speed"
                  onChange={(e) => this.setSpeed(e.target.value)} />
              </div>
              <button onClick={() => this.incrementTimeline()}><img src='' alt='scrub right' /></button>
            </div>
          </section>
        );
    }
}

export default Timeline;