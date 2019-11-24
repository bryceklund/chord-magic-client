import React, { Component } from 'react'
import LoadingIcon from './eighth-note.png'
import './Spinner.css'

export class Spinner extends Component {
    render() {
        return (
            <div viewBox="25 25 50 50" className='note_container'>
                <img className='music_note' src={LoadingIcon} />
            </div>
        );
    }
}

export default Spinner;
