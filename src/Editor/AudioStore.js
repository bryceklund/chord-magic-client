const { API_BASE_URL, API_TOKEN } = require('../config')
const chordsUrl = `${API_BASE_URL}/chords`
const scalesUrl = `${API_BASE_URL}/scales`
const options = {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json'
    })
  }

let chords
let scales
let final = {}

fetch(chordsUrl, options)
  .then(data => data.json())
  .then(data => chords = data)
  .then(data => {
    fetch(scalesUrl, options)
        .then(data => data.json())
        .then(data => scales = data)
        .then(data => {
            scales.map((scale, i) => {
                final[scale] = []
            })
        })
        .then(data => {
            scales.forEach((scale, i) => {
                chords.map((chord, i) => {
                    fetch(`${API_BASE_URL}/chord/${scale}/${chord}`, options)
                        .then(data => data.json())
                        .then(data => final[scale][chord] = data)
                })
            })
        })
        .then(data => AudioStore.chords = final)
  })


const AudioStore = {
    notes: {
        minusTwo: {
            A: 110.00,
            Bb: 116.54,
            B: 123.47,
            C: 130.81,
            Db: 138.59,
            D: 146.83,
            Eb: 155.56,
            E: 164.81,
            F: 174.61,
            Gb: 185.00,
            G: 196.00,
            Ab: 207.65
        },
        minusOne: {
            A: 220.00,
            Bb: 233.08,
            B: 246.94,
            C: 261.63,
            Db: 277.18,
            D: 293.66,
            Eb: 311.13,
            E: 329.63,
            F: 349.23,
            Gb: 369.99,
            G: 392.00,
            Ab: 415.30
        },
        zero: {    
            A: 440,
            Bb: 466.16,
            B: 493.88,
            C: 523.25,
            Db: 554.37,
            D: 587.33,
            Eb: 622.25,
            E: 659.25,
            F: 698.46,
            Gb: 739.99,
            G: 783.99,
            Ab: 830.61
        },
        plusOne: {
            A: 880.00,
            Bb: 932.33,
            B: 987.77,
            C: 1046.50,
            Db: 1108.73,
            D: 1174.66,
            Eb: 1244.51,
            E: 1318.51,
            F: 1396.91,
            Gb: 1479.98,
            G: 1567.98,
            Ab: 1661.22
        },
        plusTwo: {
            A: 1760.00,
            Bb: 1864.66,
            B: 1975.53,
            C: 2093.00,
            Db: 2217.46,
            D: 2349.32,
            Eb: 2489.02,
            E: 2637.02,
            F: 2793.83,
            Gb: 2959.96,
            G: 3135.96,
            Ab: 3322.44
        }
    },
    chords: {}
}

module.exports = AudioStore