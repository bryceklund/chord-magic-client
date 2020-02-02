import React, { Component } from 'react';
import Synth from '../Synth.js'
import Spinner from '../../Spinner.js'
import './Timeline.css';

class Timeline extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeChords: this.props.progression 
                        ? this.props.progression 
                        : [
                            {
                              id: 0,
                              name: "G",
                              scale: "maj",
                              oct: "minusTwo",
                              voice: "sawtooth",
                              active: false
                            }, 
                            {
                              id: 1,
                              name: "B",
                              scale: "maj",
                              oct: "minusTwo",
                              voice: "sawtooth",
                              active: false
                            }, 
                            {
                              id: 2,
                              name: "E",
                              scale: "min",
                              oct: "minusTwo",
                              voice: "sawtooth",
                              active: false
                            }, 
                            {
                              id: 3,
                              name: "C",
                              scale: "maj",
                              oct: "minusTwo",
                              voice: "sawtooth",
                              active: false
                            }, 
                            {
                              id: 4,
                              name: "G",
                              scale: "maj",
                              oct: "minusTwo",
                              voice: "sawtooth",
                              active: false
                            }, 
                            {
                              id: 5,
                              name: "B",
                              scale: "min",
                              oct: "minusTwo",
                              voice: "sawtooth",
                              active: false
                            }, 
                            {
                              id: 6,
                              name: "C",
                              scale: "maj",
                              oct: "minusTwo",
                              voice: "sawtooth",
                              active: false
                            }
                          ],
        timelineChords: ['', '', '', ''],
        globalView: '',
        init: 0,
        end: 4,
        currentCell: null,
        playback: [],
        speed: 1.5,
        volume: 0.1,
        bpm: 160,
        displayVolume: 25,
        loop: false,
        error: false,
        errorMessage: ''
      }
    }

    displayOctave = (oct) => {
      //converts octave from string to number
      return oct === 'minusTwo' ? -2 : oct === 'minusOne' ? -1 : oct === 'zero' ? 0 : oct === 'plusOne' ? 1 : oct === 'plusTwo' ? 2 : '' 
    }

    jumpToEnd = () => {
      if (this.state.end < this.state.activeChords.length) {
        this.setState({
          end: this.state.activeChords.length,
          init: this.state.activeChords.length - 4
        }, () => this.setTimelineChords())
      }
    }

    jumpToStart = () => {
      this.unHighlightPlus()
      this.setState({
        end: 4,
        init: 0
      }, () => this.setTimelineChords())
    }

    toggleLoop = () => {
      this.setState({
        loop: !this.state.loop
      })
    }

    setGlobalView = () => {
      let totalChords = [] 
      this.state.activeChords.forEach((chord, i) => totalChords[i] = {active: false, scale: chord.scale, name: chord.name})
      for (let i = this.state.init; i < this.state.end; i++) {
        if (totalChords[i]) {
          totalChords[i].active = true
        }
      }
      let indicator = totalChords.map(chord => chord.active ? <span className={`global ${chord.scale} ${chord.name.toLowerCase()}`}>_</span> : <span className={`global_inactive ${chord.name.toLowerCase()}`}>_</span>)
      this.setState({
        globalView: indicator
      })
    }

    loadProgression = (progression) => {
      this.setState({
        activeChords: progression
      })
    }

    jumpToChord = (index) => {
      if (index < 4) {
        this.setState({
          end: 4,
          init: 0
        }, () => this.setTimelineChords())
      } else {
        this.setState({
          end: index + 1,
          init: index - 3
        }, () => this.setTimelineChords())
      }
    }

    insertChord = (index, chord) => {
      let newId
      let idx = index
      if (this.state.activeChords.length > 0) {
        const activeIds = this.state.activeChords.map(chord => chord.id).sort((a, b) => a - b)
        newId = activeIds[activeIds.length - 1] + 1
      } else {
        newId = 0
      }
      let tempArr = this.state.activeChords
      chord = {...chord, active: false}
      if (typeof index === "number") {
        tempArr[index] = {...tempArr[index], ...chord}
      } else {
        chord.id = newId
        tempArr.push(chord)
        idx = tempArr.indexOf(chord)
      }
      this.unHighlightPlus()
      this.jumpToChord(idx)
      this.setState({
        activeChords: tempArr,
      })
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

    showError = (error) => {
      this.setState({
        error: true,
        errorMessage: error
      })
      setTimeout(() => {
        this.hideError()
      }, 4000)

    }

    hideError = () => {
      this.setState({
        error: false
      })
    }

    play = () => {
      this.setTimelineChords()
      const duration = this.state.speed
      const volume = this.state.volume
      const updateComponent = this.setTimelineChords.bind()
      const playChord = this.setActiveCell.bind()
      const showError = this.showError.bind()
      const hideError = this.hideError.bind()
      const stopPlayback = this.stopPlayback.bind()
      const context = this.props.context
      let counter = 0
      let playback = []
      while (counter < this.state.activeChords.length) {
        this.state.activeChords.forEach((chord, i) => {
          playback[i] = setTimeout(function() {
            playChord(chord.id)
            updateComponent()
            try {
              hideError()
              Synth(chord.voice, chord.oct, duration, volume, chord.scale, chord.name, context)
            } catch(error) {
              stopPlayback()
              showError(error)
            }}, i * (duration * 1000))
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
      this.setGlobalView()
    }

    decrementTimeline = () => {
        if (this.state.init > 0) {
          this.unHighlightPlus()
          this.setState({
            init: this.state.init -= 1,
            end: this.state.end -= 1
          })
          this.setTimelineChords()
        }
        this.setGlobalView()
    }

    setTimelineChords = () => {
      this.setState({
        timelineChords: this.state.activeChords.slice(this.state.init, this.state.end)
      }, this.setGlobalView())
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

    highlightPlus = (target) => {
      const tempArr = this.state.activeChords
      tempArr.map(chord => chord.active = false)
      this.setState({
        activeChords: tempArr
      })
      target.classList.toggle('highlighted_plus')
    }

    unHighlightPlus = () => {
      const cells = document.getElementsByClassName('chord_label')
      let highlightedPlus = undefined
      Object.keys(cells).map(cell => {
        if (cells[cell].classList.contains('highlighted_plus')) {
          highlightedPlus = cells[cell]
          highlightedPlus.classList.remove('highlighted_plus')
        }
      })
      
    }

    toggleActiveChord = (id) => {
      if (typeof id === 'number') {
        this.unHighlightPlus()
        let chord = this.state.activeChords.find(chord => chord.id === id)
        if (chord && !chord.active) {
          this.props.chordSelected('active')
          this.props.setIndex(this.state.activeChords.indexOf(this.state.activeChords.find(chord => chord.id === id)))
          this.setActiveCell(id)
        } else {
          this.props.chordSelected()
          this.setInactiveCell(id)
        }
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
            <div className={`${this.props.currentName ? "prog_name" : "hidden"}`}>now editing: "{this.props.currentName}"</div>
              <div className={`${this.state.error ? 'playback_error' : 'hidden'}`}><Spinner active={this.state.error} />
              Oops, try again in a few seconds...</div> 
            <div className='play_stop_buttons'>
              <button onClick={() => this.startPlayback()}><img className='play_stop_icon' src={require('../../icons/play-button.png')} alt='play button' /></button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={() => this.stopPlayback()}><img className='play_stop_icon' src={require('../../icons/stop-button.png')} alt='stop button' /></button>
              {/*<button onClick={() => this.toggleLoop()}>Loop {this.state.loop ? 'on' : 'off'}</button>*/}
            </div>
            <div className='global_view'>{this.state.globalView}</div>
            <div className='player_timeline'>

            <div className={`chord_box one ${this.state.timelineChords[0] ? this.state.timelineChords[0].scale + ' ' + this.state.timelineChords[0].name.toLowerCase() : ''}`}>
                {this.state.timelineChords[0]
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.timelineChords[0].id)}><img src={require('../../icons/delete-button.png')} alt='delete chord' /></button> 
                  : null}
                <span onClick={(e) => this.state.timelineChords[0] ? this.toggleActiveChord(this.state.timelineChords[0].id) : this.highlightPlus(e.target)}
                    className={`chord_label ${this.state.timelineChords[0] && this.state.timelineChords[0].active 
                                              ? 'highlighted' 
                                              : ''}`}>
                  {this.state.timelineChords[0]
                    ? this.state.timelineChords[0].name
                    : <span className='plus'>+</span>}
                  {this.state.timelineChords[0]
                    ? <section className={`chord_info ${this.state.timelineChords[0] && this.state.timelineChords[0].active 
                                  ? '' 
                                  : 'hidden'}`}>
                        <div className='info_label'>{this.state.timelineChords[0].scale}</div>
                        <div className='info_label'>{this.state.timelineChords[0].voice}</div>
                        <div className='info_label'>{this.displayOctave(this.state.timelineChords[0].oct)}</div> 
                      </section>
                    : ''}
                </span>
                {this.state.timelineChords[0]
                  ? (<div className='move_chord_buttons'>
                    {this.state.init > 0 
                      ? <button className='move_chord_left' onClick={() => this.swapChords(this.state.init, this.state.init - 1)}><img src={require('../../icons/move-left-arrow.png')} alt='move left' /></button>
                      : null}
                    {this.state.timelineChords[1]
                      ? <button className='move_chord_right' onClick={() => this.swapChords(this.state.init, this.state.init + 1)}><img src={require('../../icons/move-right-arrow.png')} alt='move right' /></button>
                      : null}
                    </div>)
                : null}
            </div>

            <div className={`chord_box two ${this.state.timelineChords[1] ? this.state.timelineChords[1].scale + ' ' + this.state.timelineChords[1].name.toLowerCase() : ''}`}>
                {this.state.timelineChords[1] 
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.timelineChords[1].id)}><img src={require('../../icons/delete-button.png')} alt='delete chord' /></button> 
                  : null}
                <span onClick={(e) => this.state.timelineChords[1] ? this.toggleActiveChord(this.state.timelineChords[1].id) : this.highlightPlus(e.target)} 
                  className={`chord_label ${this.state.timelineChords[1] && this.state.timelineChords[1].active  
                                              ? 'highlighted' 
                                              : ''}`}>
                  {this.state.timelineChords[1]
                    ? this.state.timelineChords[1].name
                    : this.state.timelineChords[0]
                    ? <span className='plus'>+</span>
                    : null}
                  {this.state.timelineChords[1]
                    ? <section className={`chord_info ${this.state.timelineChords[1] && this.state.timelineChords[1].active 
                                            ? '' 
                                            : 'hidden'}`}>
                        <div className='info_label'>{this.state.timelineChords[1].scale}</div>
                        <div className='info_label'>{this.state.timelineChords[1].voice}</div>
                        <div className='info_label'>{this.displayOctave(this.state.timelineChords[1].oct)}</div> 
                      </section>
                    : ''}
                </span>
                {this.state.timelineChords[1]
                  ? (<div className='move_chord_buttons'>
                      <button className='move_chord_left' onClick={() => this.swapChords(this.state.init + 1, this.state.init)}><img src={require('../../icons/move-left-arrow.png')} alt='move left' /></button>
                    {this.state.timelineChords[2]
                      ? <button className='move_chord_right' onClick={() => this.swapChords(this.state.init + 1, this.state.init + 2)}><img src={require('../../icons/move-right-arrow.png')} alt='move right' /></button>
                      : null}
                    </div>)
                : null}
            </div>

            <div className={`chord_box three ${this.state.timelineChords[2] ? this.state.timelineChords[2].scale + ' ' + this.state.timelineChords[2].name.toLowerCase() : ''}`}>
                {this.state.timelineChords[2] 
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.timelineChords[2].id)}><img src={require('../../icons/delete-button.png')} alt='delete chord' /></button> 
                  : null}
                <span onClick={(e) => this.state.timelineChords[2] ? this.toggleActiveChord(this.state.timelineChords[2].id) : this.highlightPlus(e.target)}
                  className={`chord_label ${this.state.timelineChords[2] && this.state.timelineChords[2].active 
                                              ? 'highlighted' 
                                              : ''}`}>
                  {this.state.timelineChords[2] 
                    ? this.state.timelineChords[2].name
                    : this.state.timelineChords[1] 
                    ? <span className='plus'>+</span>
                    : null}
                  {this.state.timelineChords[2]
                    ? <section className={`chord_info ${this.state.timelineChords[2] && this.state.timelineChords[2].active 
                                            ? '' 
                                            : 'hidden'}`}>
                        <div className='info_label'>{this.state.timelineChords[2].scale}</div>
                        <div className='info_label'>{this.state.timelineChords[2].voice}</div>
                        <div className='info_label'>{this.displayOctave(this.state.timelineChords[2].oct)}</div> 
                      </section>
                    : ''}
                </span>
                {this.state.timelineChords[2]
                  ? (<div className='move_chord_buttons'>
                      <button className='move_chord_left' onClick={() => this.swapChords(this.state.init + 2, this.state.init + 1)}><img src={require('../../icons/move-left-arrow.png')} alt='move left' /></button>
                    {this.state.timelineChords[3]
                      ? <button className='move_chord_right' onClick={() => this.swapChords(this.state.init + 2, this.state.init + 3)}><img src={require('../../icons/move-right-arrow.png')} alt='move right' /></button>
                      : null}
                    </div>)
                : null}
              </div>

              <div className={`chord_box four ${this.state.timelineChords[3] ? this.state.timelineChords[3].scale + ' ' + this.state.timelineChords[3].name.toLowerCase() : ''}`}>
                {this.state.timelineChords[3] 
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.timelineChords[3].id)}><img src={require('../../icons/delete-button.png')} alt='delete chord' /></button> 
                  : null}
                <span onClick={(e) => this.state.timelineChords[3] ? this.toggleActiveChord(this.state.timelineChords[3].id) : this.highlightPlus(e.target)} 
                  className={`chord_label ${this.state.timelineChords[3] && this.state.timelineChords[3].active
                                              ? 'highlighted' 
                                              : ''}`}>
                  {this.state.timelineChords[3] 
                    ? this.state.timelineChords[3].name
                    : this.state.timelineChords[2] 
                    ? <span className='plus'>+</span> 
                    : null}
                    {this.state.timelineChords[3] 
                      ? <section className={`chord_info ${this.state.timelineChords[3] && this.state.timelineChords[3].active 
                                          ? '' 
                                          : 'hidden'}`}>
                          <div className='info_label'>{this.state.timelineChords[3].scale}</div>
                          <div className='info_label'>{this.state.timelineChords[3].voice}</div>
                          <div className='info_label'>{this.displayOctave(this.state.timelineChords[3].oct)}</div> 
                        </section>
                      : ''}
                </span>
                {this.state.timelineChords[3]
                  ? (<div className='move_chord_buttons'>
                      <button className='move_chord_left' onClick={() => this.swapChords(this.state.init + 3, this.state.init + 2)}><img src={require('../../icons/move-left-arrow.png')} alt='move left' /></button>
                    {this.state.activeChords[this.state.end]
                      ? <button className='move_chord_right' onClick={() => this.swapChords(this.state.init + 3, this.state.init + 4)}><img src={require('../../icons/move-right-arrow.png')} alt='move right' /></button>
                      : null}
                    </div>)
                : null}
              </div>
            </div>

            <div className='scrubber_buttons'>
              <button onClick={() => this.decrementTimeline()}><img src={require('../../icons/scrub-left-arrow.png')} alt='scrub left' /></button>
              <div className="slide_container">
                <label className='volume' htmlFor='volume'>Volume: {this.state.displayVolume}%</label>
                <input type="range" min="0" max="100" defaultValue="25" className="volume_slider" id="volume" 
                  onChange={(e) => this.setVolume(e.target.value)} />
              </div>
              <div className="slide_container">
                <label className='speed' htmlFor='speed'>Speed: {this.state.bpm} BPM</label>
                <input type="range" min="1" max="100" defaultValue="30" className="speed_slider" id="speed"
                  onChange={(e) => this.setSpeed(e.target.value)} />
              </div>
              <button onClick={() => this.incrementTimeline()}><img src={require('../../icons/scrub-right-arrow.png')} alt='scrub right' /></button>
            </div>
            <div className='jump_buttons'>
              <button onClick={() => this.jumpToStart()}><img src={require('../../icons/jump-left-arrow.png')} alt='jump to beginning'/></button>
              <button onClick={() => this.jumpToEnd()}><img src={require('../../icons/jump-right-arrow.png')} alt='jump to end' /></button>
            </div>
          </section>
        );
    }
}

export default Timeline;