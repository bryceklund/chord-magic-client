import React, { Component } from 'react';
import './Timeline.css';

class Timeline extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeChords: [0, 1, 2, 3, 4, 5, 6],
        init: 0,
        end: 4,//this.state.activeChords.length < 5 ? this.state.activeChords.length : 4,
        timelineChords: [0, 1, 2, 3, 4, 5, 6].slice(this.init, this.end)
      }
    }
    incrementTimeline = () => {
      this.setState({
        init: this.state.init++,
        end: this.state.end++
      })
    }
    decrementTimeline = () =>  {
      this.setState({
        init: this.state.init--,
        end: this.state.end--
      })
    }
    render() {
        return (
            <section className='timeline'>
            <div className='play_stop_buttons'>
              <button><img src='' alt='play button' /></button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button><img src='' alt='stop button' /></button>
            </div>
            <div className='player_timeline'>
              <div className='chord_box'>
                <button className='delete_chord'>X</button>
                <span className='chord_label'>{this.state.timelineChords[0]}</span>
                <div className='move_chord_buttons'>
                  <button className='move_chord_left'><img src='' alt='move left' /></button>
                  <button className='move_chord_right'><img src='' alt='move right' /></button>
                </div>
              </div>
              <div className='chord_box'>
                <button className='delete_chord'>X</button>
                <span className='chord_label'>{this.state.timelineChords[1]}</span>
                <div className='move_chord_buttons'>
                  <button className='move_chord_left'><img src='' alt='move left' /></button>
                  <button className='move_chord_right'><img src='' alt='move right' /></button>
                </div>
              </div>
              <div className='chord_box'>
                <button className='delete_chord'>X</button>
                <span className='chord_label'>{this.state.timelineChords[2]}</span>
                <div className='move_chord_buttons'>
                  <button className='move_chord_left'><img src='' alt='move left' /></button>
                  <button className='move_chord_right'><img src='' alt='move right' /></button>
                </div>
              </div>
              <div className='chord_box'>
                <button className='delete_chord'>X</button>
                <span className='chord_label'>{this.state.timelineChords[3]}</span>
                <div className='move_chord_buttons'>
                  <button className='move_chord_left'><img src='' alt='move left' /></button>
                  <button className='move_chord_right'><img src='' alt='move right' /></button>
                </div>
              </div>
            </div>
            <div className='scrubber_buttons'>
              <button onClick={() => this.decrementTimeline}><img src='' alt='scrub left' /></button>
              <div className="slide_container">
                <label for='volume'>Volume</label>
                <input type="range" min="1" max="100" value="50" className="volume_slider" id="volume" />
              </div>
              <div className="slide_container">
                <label for='speed'>Speed</label>
                <input type="range" min="1" max="100" value="50" className="speed_slider" id="speed" />
              </div>
              <button onClick={() => this.incrementTimeline}><img src='' alt='scrub right' /></button>
            </div>
          </section>
        );
    }
}

export default Timeline;