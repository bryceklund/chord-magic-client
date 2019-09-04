import React, { Component } from 'react';
import './Timeline.css';

class Timeline extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeChords: [
          {
            id: 0,
            name: 'G',
            active: false
          }, 
          {
            id: 1,
            name: 'A',
            active: false
          }, 
          {
            id: 2,
            name: 'B',
            active: false
          }, 
          {
            id: 3,
            name: 'C',
            active: false
          }, 
          {
            id: 4,
            name: 'D',
            active: false
          }, 
          {
            id: 5,
            name: 'E',
            active: false
          }, 
          {
            id: 6,
            name: 'C',
            active: false
          }
        ],
        timelineChords: ['', '', '', ''],
        init: 0,
        end: 4,
        currentCell: null,
        stopped: false
      }
    }

    stopPlayback = () => {
      this.setState({
        stopped: true
      })
    }

    play = () => {
      const updateComponent = this.setTimelineChords.bind()
      const playChord = this.setActiveCell.bind()
      const stopPlayback = this.stopPlayback.bind()
      let counter = 0
      function async(arr) {
        counter++
        if (counter === arr.length) {
          stopPlayback()
        }
      }

        this.state.activeChords.forEach((chord, i, arr) => {
          if (this.state.stopped === false) {
            console.log(this.state.stopped)
            setTimeout(function() {
              playChord(i)
              updateComponent()
              async(arr)
              console.log(counter)}, i * 1000)
            }
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
      console.log(this.state.stopped)
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

    setActiveCell = (id) => {
      this.state.activeChords.map(chord => {
        if (chord.id === id) {
          chord.active = true
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
              <button onClick={() => this.play()}><img src='' alt='play button' /></button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={() => this.stopPlayback()}><img src='' alt='stop button' /></button>
            </div>
            <div className='player_timeline'>

            <div className={`chord_box one`}>
                {this.state.timelineChords[0]
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.timelineChords[0].id)}>X</button> 
                  : null}
                <span onClick={() => this.setActiveCell(this.state.timelineChords[0].id)} 
                    className={`chord_label ${this.state.timelineChords[0] && this.state.timelineChords[0].active 
                                              ? 'highlighted' 
                                              : ''}`}>
                  {this.state.timelineChords[0]
                    ? this.state.timelineChords[0].name 
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
                <span onClick={() => this.setActiveCell(this.state.timelineChords[1].id)} 
                  className={`chord_label ${this.state.timelineChords[1] && this.state.timelineChords[1].active  
                                              ? 'highlighted' 
                                              : ''}`}>
                  {this.state.timelineChords[1] 
                    ? this.state.timelineChords[1].name 
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
                <span onClick={() => this.setActiveCell(this.state.timelineChords[2].id)} 
                  className={`chord_label ${this.state.timelineChords[2] && this.state.timelineChords[2].active 
                                              ? 'highlighted' 
                                              : ''}`}>
                  {this.state.timelineChords[2] 
                    ? this.state.timelineChords[2].name 
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
                <span onClick={() => this.setActiveCell(this.state.timelineChords[3].id)} 
                  className={`chord_label ${this.state.timelineChords[3] && this.state.timelineChords[3].active
                                              ? 'highlighted' 
                                              : ''}`}>
                  {this.state.timelineChords[3] 
                    ? this.state.timelineChords[3].name 
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
                <label htmlFor='volume'>Volume</label>
                <input type="range" min="1" max="100" value="50" className="volume_slider" id="volume" />
              </div>
              <div className="slide_container">
                <label htmlFor='speed'>Speed</label>
                <input type="range" min="1" max="100" value="50" className="speed_slider" id="speed" />
              </div>
              <button onClick={() => this.incrementTimeline()}><img src='' alt='scrub right' /></button>
            </div>
          </section>
        );
    }
}

export default Timeline;