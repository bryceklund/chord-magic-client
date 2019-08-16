import React, { Component } from 'react';
import './Timeline.css';

class Timeline extends Component {
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
                <span className='chord_label'>G</span>
                <div className='move_chord_buttons'>
                  <button className='move_chord_left'><img src='' alt='move left' /></button>
                  <button className='move_chord_right'><img src='' alt='move right' /></button>
                </div>
              </div>
              <div className='chord_box'>
                <button className='delete_chord'>X</button>
                <span className='chord_label'>B</span>
                <div className='move_chord_buttons'>
                  <button className='move_chord_left'><img src='' alt='move left' /></button>
                  <button className='move_chord_right'><img src='' alt='move right' /></button>
                </div>
              </div>
              <div className='chord_box'>
                <button className='delete_chord'>X</button>
                <span className='chord_label'>Em</span>
                <div className='move_chord_buttons'>
                  <button className='move_chord_left'><img src='' alt='move left' /></button>
                  <button className='move_chord_right'><img src='' alt='move right' /></button>
                </div>
              </div>
              <div className='chord_box'>
                <button className='delete_chord'>X</button>
                <span className='chord_label'>C</span>
                <div className='move_chord_buttons'>
                  <button className='move_chord_left'><img src='' alt='move left' /></button>
                  <button className='move_chord_right'><img src='' alt='move right' /></button>
                </div>
              </div>
            </div>
            <div className='scrubber_buttons'>
              <button><img src='' alt='scrub left' /></button>
              <div className="slide_container">
                <label for='volume'>Volume</label>
                <input type="range" min="1" max="100" value="50" className="volume_slider" id="volume" />
              </div>
              <div className="slide_container">
                <label for='speed'>Speed</label>
                <input type="range" min="1" max="100" value="50" className="speed_slider" id="speed" />
              </div>
              <button><img src='' alt='scrub right' /></button>
            </div>
          </section>
        );
    }
}

export default Timeline;