import unmute from './unmute'

const AudioStore = require('./AudioStore.js')
const AudioUnlock = require('web-audio-touch-unlock')

function Synth(voice, oct, dur, vol, scale, chordName) {
    //create instance of the API
    const context = new (window.AudioContext || window.webkitAudioContext)()

    //notes in this octave
    const notes = AudioStore.notes[oct]

    //notes in this chord
    const chord = AudioStore.chords[scale][chordName]

    console.log(notes, chord)
    //create enough oscillators
    let synth = []
    for (let i = 0; i < chord.length; i++) {
        synth[i] = context.createOscillator()
    }

    //set voice types
    //eg. 'triangle', 'saw', 'square', or 'sine'
    synth.map((osc) => {
        osc.type = voice
    })

    //set osc notes
    synth.map((osc, i) => {
        osc.frequency.value = notes[chord[i]]
    })

    //create gain instance 
    const volume = context.createGain()
    volume.gain.value = vol

    //connect gain to computer audio
    volume.connect(context.destination)

    //connect oscillators to gain instance
    synth.map(osc => {
        osc.connect(volume)
    })

    //get current time from API
    const startTime = context.currentTime

    //fade in and out
    volume.gain.setValueAtTime(0, startTime)
    volume.gain.linearRampToValueAtTime(vol, startTime + (dur / 10))
    volume.gain.exponentialRampToValueAtTime(0.01, startTime + dur)

    unmute(context)

    //start and stop playback
    synth.map(osc => {
        osc.start(startTime)
        osc.stop(startTime + dur)
    })
}

export default Synth;
