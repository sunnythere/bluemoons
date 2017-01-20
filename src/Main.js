import React from 'react'
import Tone from 'tone'
import Field from './Field';
import Options from './Options'


export default class Main extends React.Component {

constructor() {
  super()
  this.state = {
    text: '',
    musicArr: [],
    bpm: 120,
    ramp: 0,
    optionsClicked: false
  }

  this.writeText = this.writeText.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)

  this.toggleOptionsPanel = this.toggleOptionsPanel.bind(this)
  this.watchBPM = this.watchBPM.bind(this)
  this.stopTone = this.stopTone.bind(this)
}

// creates synth and sequence
makeTone(notesArr) {
  let tone = new Tone.Synth().toMaster()
  let pattern = new Tone.Sequence(function(time, note){
    tone.triggerAttackRelease(note, "4n", time)
}, notesArr, "4n")

  pattern.start(0)
  pattern.loop = false
  Tone.Transport.loop = false
}

// stops play
stopTone() {
  Tone.Transport.stop()
}

// harmonize
makeHarmony(note) {
  let harmonized = Tone.Frequency(note).harmonize([0, 3, 7]); //["A4", "C5", "E5"]
}

//onChange for BPM slide
watchBPM(e) {
  let bpm = e.target.value
  this.setState({ bpm: bpm })
  console.log('bpm ', bpm)
  Tone.Transport.bpm.value = bpm
}

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
    } else if (letter.match(/[!.?]/)) {
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

writeText(event) {
  this.setState({ text: event.target.value });
  console.log(this.state.text)
}

handleSubmit(event) {
  event.preventDefault()

  const notes = this.makeMusicNotes_wordNote(this.state.text)
  //const notes = this.makeMusicNotes("arrrbcrdrrerrrrfg")

  this.makeTone(notes)
  console.log('this.state.musicArr ', this.state.musicArr)

  //StartAudioContext(Tone.context, 'buttonElement').then(function() { })
  Tone.Transport.start()
}


toggleOptionsPanel() {
  this.setState({ optionsClicked: !this.state.optionsClicked })
}


render() {
  return (
    <div>
      <Field
        text={this.state.text}
        handleSubmit={this.handleSubmit}
        writeText={this.writeText} />

      <button onClick={this.stopTone} />
      <button onClick={this.toggleOptionsPanel} />
      {
        this.state.optionsClicked && <Options

                    watchBPM={this.watchBPM}
                    bpm={this.state.bpm} />
      }
    </div>
  )
}

}

