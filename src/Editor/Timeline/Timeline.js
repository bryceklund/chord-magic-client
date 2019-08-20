import React, { Component } from 'react';
import './Timeline.css';

class Timeline extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeChords: ['G', 'A', 'B', 'C', 'D', 'E', 'C'],
        init: 0,
        end: 4,
        timelineChords: ['', '', '', '']
      }
    }
    incrementTimeline = () => {
      if (this.state.timelineChords.length > 3) {
        this.setState({
          init: this.state.init += 1,
          end: this.state.end +=1
        })
        this.setTimelineChords()
      }
    }
    decrementTimeline = () => {
      if (this.state.timelineChords.length >= 3) {
        if (this.state.init > 0) {
          this.setState({
            init: this.state.init -= 1,
            end: this.state.end -= 1
          })
          this.setTimelineChords()
        }
      }
    }
    setTimelineChords = () => {
      this.setState({
        timelineChords: this.state.activeChords.slice(this.state.init, this.state.end)
      })
      console.log(this.state.init, this.state.end)
    }
    removeChord = (index) => {
      this.setState({
        activeChords: this.state.activeChords.splice(index, 1)
      }, this.setTimelineChords())
      console.log(this.state.activeChords, 'master chords list')
      console.log(this.state.timelineChords, "active chords list")
    }
    swapChords = (a, b) => {
      const temp = this.state.activeChords[a]
      const tempArr = this.state.activeChords
      tempArr[a] = tempArr[b]
      tempArr[b] = temp
      console.log('swap chords', tempArr)
      console.log(a, b)
    }
    componentDidMount() {
      this.setTimelineChords()
      console.log(this.state.timelineChords)
    }    
    render() {
        return (
            <section className='timeline'>
            <div className='play_stop_buttons'>
              <button><img src='' alt='play button' /></button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button><img src='' alt='stop button' /></button>
            </div>
            <div className='player_timeline'>

            <div className='chord_box one'>
                {this.state.timelineChords[0] 
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.init)}>X</button> 
                  : null}
                <span className='chord_label'>
                  {this.state.timelineChords[0] 
                    ? this.state.timelineChords[0] 
                    : '+'}
                </span>
                {this.state.timelineChords[0]
                  ? (<div className='move_chord_buttons'>
                    {this.state.init > 0 
                      ? <button className='move_chord_left' onClick={() => this.swapChords(this.state.init, this.state.init - 1)}><img src='' alt='move left' /></button>
                      : null}
                    {this.state.timelineChords[1]
                      ? <button className='move_chord_right'><img src='' alt='move right' /></button>
                      : null}
                    </div>)
                : null}
            </div>

            <div className='chord_box two'>
                {this.state.timelineChords[1] 
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.init + 1)}>X</button> 
                  : null}
                <span className='chord_label'>
                  {this.state.timelineChords[1] 
                    ? this.state.timelineChords[1] 
                    : this.state.timelineChords[0] 
                    ? '+' 
                    : null}
                </span>
                {this.state.timelineChords[1]
                  ? (<div className='move_chord_buttons'>
                      <button className='move_chord_left'><img src='' alt='move left' /></button>
                    {this.state.timelineChords[2]
                      ? <button className='move_chord_right'><img src='' alt='move right' /></button>
                      : null}
                    </div>)
                : null}
            </div>

            <div className='chord_box three'>
                {this.state.timelineChords[2] 
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.init + 2)}>X</button> 
                  : null}
                <span className='chord_label'>
                  {this.state.timelineChords[2] 
                    ? this.state.timelineChords[2] 
                    : this.state.timelineChords[1] ? '+' 
                    : null}
                </span>
                {this.state.timelineChords[2]
                  ? (<div className='move_chord_buttons'>
                      <button className='move_chord_left'><img src='' alt='move left' /></button>
                    {this.state.timelineChords[3]
                      ? <button className='move_chord_right'><img src='' alt='move right' /></button>
                      : null}
                    </div>)
                : null}
              </div>

              <div className='chord_box four'>
                {this.state.timelineChords[3] 
                  ? <button className='delete_chord' onClick={() => this.removeChord(this.state.end)}>X</button> 
                  : null}
                <span className='chord_label'>
                  {this.state.timelineChords[3] 
                    ? this.state.timelineChords[3] 
                    : this.state.timelineChords[2] 
                    ? '+' 
                    : null}
                </span>
                {this.state.timelineChords[3]
                  ? (<div className='move_chord_buttons'>
                      <button className='move_chord_left'><img src='' alt='move left' /></button>
                    {this.state.activeChords[this.state.end]
                      ? <button className='move_chord_right'><img src='' alt='move right' /></button>
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