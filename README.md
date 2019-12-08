
# Chord Magic

  

This project is live, [right here](https://chord-magic.bryceklund.dev/).

  

## API Documentation

  

Can be found in the readme of [this repo](https://github.com/bryceklund/chord-magic-server).

  

## Summary & How-To

  

Chord Magic is a tool for piecing together and storing musical chord progressions. It's built with React and comes with an API (see above). The core of the app is made up of a timeline and a library/settings component.

![timeline and library/settings](https://i.imgur.com/i0JZtIR.png)


You can scrub through the timeline using the single arrows,

![scrub arrows](https://i.imgur.com/gGpPHHU.png)


or jump to the start/end using the double arrows: 

![jump arrows](https://i.imgur.com/cyQxLvz.png)


Swap chord positions by clicking the arrows on the chords and delete chords by clicking the X, 

![chord swap buttons](https://i.imgur.com/RbSbY0b.gif)

adjust playback settings with the volume and speed sliders, 

![playback settings](https://i.imgur.com/FIIlksi.png)

and play or stop the current progression:

![play stop buttons](https://i.imgur.com/GLdtt0s.png)


Click on a chord to select it and learn what its scale, instrument, and octave are.

  ![chord selection](https://i.imgur.com/i7cMgfH.gif)

To add chords, first drill down one of the provided scales in the library by clicking on it. Next, click a chord to select it. Enable "prehear" to hear the chord when selected, before adding it to the timeline. Use the instrument and octave settings to change the sound of the chord. Next, select the chord you'd like to replace in the timeline, or select nothing to add the chord to the end. Insert the chord by clicking the "insert chord" button.

![inserting a chord](https://i.imgur.com/K0TPTgO.gif)
  

Register for an account by following the upper-right link, or log in if you already have an account.

![login signup buttons](https://i.imgur.com/Iw8ppBK.png)
  

While signed in, view your saved progressions by clicking "Saved Progressions" in the upper right corner. Alternatively, save the current progression with the "Save Progression" button in the library's settings pane (if you're editing an existing progression, you can choose "Overwrite Existing" to commit your changes).

![progressions button](https://i.imgur.com/JsByDIJ.gif)

 

Load a saved progression by selecting it from the Saved Progressions page and clicking "load". You can also play/stop or delete a saved progression using the corresponding buttons in the panel.

![loading a progression](https://i.imgur.com/4BT6Oby.gif)


## Technologies Used
Bootstrapped with create-react-app, frontend written in JavaScript ES6 with React 16.9

Audio rendered via the Web Audio API

Backend written in Node.js with Express, bcrypt, and jwt

Database built with PostgreSQL