import React, { Component } from 'react';
import './Timeline.css'

export class TimelineError extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false
        }
    }

    static getDerivedStateFromError(error) {
        return { error: true }
    }

    render() {
        if (this.state.error) {
            return (
                <div className='error'>
                    Still loading! Try again in a few moments.
                </div>
            )
        }
        return this.props.children
    }
}

export default TimelineError;
