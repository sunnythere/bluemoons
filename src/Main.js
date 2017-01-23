import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Link} from 'react-router'
import Tone from 'tone'
import Field from './Field';
import Options from './Options'
import BPM from './BPM'
import Screen from './Screen'
import Book from './Book'



export default class Main extends React.Component {

constructor() {
  super()
  this.state = {
    text: '',
    musicArr: [],
    bpm: 120,
    optionsClicked: false,
    opBPMClicked: false,
    returnKey: false,
    transportStop: true,
    inputTextVis: '1',
    letterClassA: 'underline',
    letterClassB: 'letters'

  };

  this.writeText = this.writeText.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)

  this.toggleOptionsPanel = this.toggleOptionsPanel.bind(this)
  this.toggleBPMPanel = this.toggleBPMPanel.bind(this)
  this.onChangeBPM = this.onChangeBPM.bind(this)
  this.onChangeVoice = this.onChangeVoice.bind(this)
  this.stopTone = this.stopTone.bind(this)
  this.randomOctave = this.randomOctave.bind(this)
  // this.makeHarmony = this.makeHarmony.bind(this)
  this.disappearText = this.disappearText.bind(this)
  this.clearText = this.clearText.bind(this)

  this.tone = new Tone.PolySynth(3, Tone.Synth).toMaster()
}

/* ---------------words to music notation-----------------*/
makeMusicNotes_wordNote(str) {

  let musicNotes = []
  let oneNote = []
  let upperCase = ''

  for (let x = 0; x < str.length; x++) {

    let letter = str[x]

    if (['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(letter)) {
        oneNote.push(letter+ '3')
    } else if (['a', 'b', 'c', 'd', 'e', 'f', 'g'].includes(letter)) {
        upperCase =
        oneNote.push(letter+ '4')
    } else if (letter === ' ') {
      if (oneNote.length) {
        musicNotes.push(oneNote)
        oneNote = []
      }
    } else if (letter.match(/[!.,;?]/)) {
        if (oneNote.length) {
          musicNotes.push(oneNote, [])
          oneNote = []
        }
    } else {
      continue;
    }
  }

  if (oneNote) musicNotes.push(oneNote)
  if (!musicNotes[musicNotes.length-1].length) {
    musicNotes.pop()
  }
  this.setState({ musicArr: musicNotes })
  return musicNotes
}

// tranlation for tone.part object array.  output format: {time: '1:0', val: 'C4', dur: '8n', vel: '1'}
makeMusicNotes_Obj(str) {  //original BlueMoons translation formula
  var musicNotes = []
  var oneNote = {vel: '.8', dur: 0}
  var nextStartTime = "0:0:1"

  for (let x = 0; x < str.length; x++) {
    let letter = str[x]

    if (letter.match(/\s|[!.,;?]|[A-G]/i)) {
        if (oneNote.val) {
          /*  -- end prev note -- */
          oneNote.dur = Tone.Time('16n').mult(oneNote.dur).toNotation()  //convert number of sixteenths to duration
          oneNote.time = Tone.Time(nextStartTime).toBarsBeatsSixteenths() //turn accumlated start time to TransportTime format
          musicNotes.push(oneNote)
              console.log(oneNote)

          nextStartTime = `${nextStartTime} + ${oneNote.dur}` //assign new start time for next note
          oneNote = {vel: '.8', dur: 0}  //replaces oneNote values
        }

        if (letter.match(/[a-g]/i)) {
          oneNote.val = letter + this.randomOctave()
          oneNote.dur += 1
        } else {
          nextStartTime = `${nextStartTime} + 16n`
        }
    } else {
        if (oneNote.val) oneNote.dur += 1
        else nextStartTime = `${nextStartTime} + 16n`
    }
  }

  if (oneNote.val) {
      oneNote.dur = Tone.Time('16n').mult(oneNote.dur).toNotation()
      oneNote.time = nextStartTime
      musicNotes.push(oneNote)
  }
  this.setState({ musicArr: musicNotes })
  return musicNotes
}

makeMusicNotes_Obj1(str) {  //altered translation formula
  var musicNotes = []
  var oneNote = {vel: '.9', dur: 0}
  var nextStartTime = "0:0:1"

  for (let x = 0; x < str.length; x++) {
    let letter = str[x]

    if (letter.match(/[!.,;?]|[A-G]/i)) {
        if (oneNote.val) {
          /*  -- end prev note -- */
          oneNote.dur = Tone.Time('16n').mult(oneNote.dur).toNotation()  //convert number of sixteenths to duration
          oneNote.time = Tone.Time(nextStartTime).toBarsBeatsSixteenths() //turn accumlated start time to TransportTime format
          musicNotes.push(oneNote)
              console.log(oneNote)

          nextStartTime = `${nextStartTime} + ${oneNote.dur}` //assign new start time for next note
          oneNote = {vel: '.8', dur: 0}  //replaces oneNote values
        }

        if (letter.match(/[a-g]/i)) {
          oneNote.val = letter + this.randomOctave()
          oneNote.dur += 1
        // } else if (letter.match(/[A-G]/)) {
        //   let startingNote = letter + this.randomOctave()
        //   oneNote.val = this.makeHarmony(startingNote)
        //   oneNote.dur += 1
        } else {
          nextStartTime = `${nextStartTime} + 16n`
        }
    } else if (letter.match(/\s/)) {
        if (oneNote.val) {
          oneNote.dur += 1
          oneNote.vel = '.6'
        } else {
          nextStartTime = `${nextStartTime} + 16n`
        }
    } else {
        if (oneNote.val) oneNote.dur += 1
        else nextStartTime = `${nextStartTime} + 16n`
    }
  }

  if (oneNote.val) {
      oneNote.dur = Tone.Time('16n').mult(oneNote.dur).toNotation()
      oneNote.time = nextStartTime
      musicNotes.push(oneNote)
  }
  this.setState({ musicArr: musicNotes })
  return musicNotes
}


// select random octave
randomOctave() {
  let num = Math.floor(Math.random() * 3)
  switch (num) {
    case 0:
      return '3'
    case 1:
      return '4'
    case 2:
      return '5'
    default:
      return '4'
  }
}

/* ---------------sounds-----------------*/
makeSynth() {
  this.tone = new Tone.PolySynth(3, Tone.Synth).toMaster();
}
makeSynth1() {  //glass
  this.tone = new Tone.PolySynth(3, Tone.Synth, {
    "portamento" : 0.0,
    "oscillator": {
        "type": "square3"
    },
    "envelope": {
        "attack": 2,
        "decay": 1,
        "sustain": 0.2,
        "release": 1,
        //"attackCurve": "bounce"
    }}).toMaster()
}
makeSynth2() {  //marimba
  this.tone = new Tone.PolySynth(3, Tone.FMSynth, {
    "harmonicity": 3.01,
    "modulationIndex": 14,
    "oscillator": {
        "type": "triangle"
    },
    "envelope": {
        "attack": 0.2,
        "decay": 0.3,
        "sustain": 0.1,
        "release": 1.2
    },
    "modulation" : {
        "type": "square"
    },
    "modulationEnvelope" : {
        "attack": 0.01,
        "decay": 0.5,
        "sustain": 0.2,
        "release": 0.1
    }
  }).toMaster()
}

// creates synth and sequence
makeSynthSeq(tone, notesArr) {
  let pattern = new Tone.Sequence( (time, note) => {
    this.tone.triggerAttackRelease(note, "4n", time)
  }, notesArr, "4n").start()

  pattern.loop = false
}
// creates polysynth (w/ synth) and part
makeSynthPart(notesArr) {
  let pattern = new Tone.Part((time, note) => {
    this.tone.triggerAttackRelease(note.val, note.dur, time, note.vel)

    Tone.Draw.schedule(() => {
    console.log('hey!', Tone.Transport)
      // ???

  }, time)

  }, notesArr).start()
}


// stops Transport
stopTone() {
  if (this.state.transportStop) { Tone.Transport.stop() }
  else { Tone.Transport.start("+0.1") }
  this.setState({ transportStop: !this.state.transportStop })
  this.setState({ returnKey: false })
}


// harmonize
// makeHarmony(note) {
//   let harmonized = new Tone.Frequency(note).harmonize([0, 3, 7]).eval();  // returns array;  w/o .eval(), returns func
//   console.log(note)

//   return harmonized
// }

/* ---------------visuals-----------------*/
//Tone.Draw()

/* ---------------event handlers-----------------*/

toggleOptionsPanel() {
  this.setState({ optionsClicked: !this.state.optionsClicked })
}
toggleBPMPanel() {
  this.setState({ opBPMClicked: !this.state.opBPMClicked })
}

//watches BPM slide
onChangeBPM(e) {
  let bpm = e.target.value
  this.setState({ bpm: bpm })
  console.log('bpm ', bpm)
  Tone.Transport.bpm.value = bpm
}

//watches voice pulldown
onChangeVoice(e) {
  let voice = e.target.value
  console.log('e.target.value ', e.target.value)
  switch (voice) {
    case 'synth':
    this.makeSynth()
    break;

    case 'glass':
    this.makeSynth1()
    break;

    case 'ecello':
    this.makeSynth2()
    break;

    default:
    this.makeSynth()
  }
}

writeText(event) {
  this.setState({ text: event.target.value });
  console.log(this.state.text)
}

disappearText() {
  this.setState({ inputTextVis: '0' })
}

clearText() {
  this.setState({ text: '' })
}

// ------------ PLAYS NOTES---------
handleSubmit(event) {
  event.preventDefault()
  // const notes = this.makeMusicNotes_wordNote(this.state.text)
  const notes = this.makeMusicNotes_Obj1(this.state.text)

  this.setState({ returnKey: true })

  //let chord = ['C4', 'E4', 'G4']

  this.makeSynthPart(notes)
  console.log('this.state.musicArr ', this.state.musicArr)
  Tone.Transport.start()
  this.setState({ transportStop: false })

  this.disappearText()
}



render() {

  return (
    <div id="div_main">
      <div>
        <Field
          text={this.state.text}
          handleSubmit={this.handleSubmit}
          writeText={this.writeText}
          disappearText={this.state.inputTextVis}/>

      </div>
      <div id="div_btn">

        <button onClick={this.stopTone} />

        <button onClick={this.toggleOptionsPanel} name="voice"/>
        <button onClick={this.toggleBPMPanel} name="bpm" />
        <button id="clear_btn" onClick={this.clearText} />
        {
          this.state.optionsClicked && <Options
                      onChangeVoice={this.onChangeVoice}/>
        }
        {
          this.state.opBPMClicked && <BPM
                      onChangeBPM={this.onChangeBPM}
                      bpm={this.state.bpm} />
        }
      </div>
      <div>



      {
        <Screen
          text={this.state.text}
          returnKey={this.state.returnKey}
          letterClassA={this.state.letterClassA}
          letterClassB={this.state.letterClassB}
          musicArr={this.state.musicArr}/>
      }
      </div>

      <div id="div_bookbtn">
      <Link to="/book"><button id="book_btn" /></Link>
      </div>
    </div>
  )
}

}

