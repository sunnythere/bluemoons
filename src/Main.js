import React from 'react'
import Tone from 'tone'
import Field from './Field';


export default class Main extends React.Component {

constructor() {
  super()
  this.state = {
    text: '',
    musicArr: []
  }
  // this.makeTone = this.makeTone.bind(this)
  // this.makeMusicNotes = this.makeMusicNotes.bind(this)
  this.writeText = this.writeText.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
}

makeTone(notesArr) {
    var tone = new Tone.Synth().toMaster()
    var pattern = new Tone.Pattern(function(time, note){
    tone.triggerAttackRelease(note, 0.25);
}, notesArr);
    pattern.start(1);
    Tone.Transport.loop = false

}

//   let synth = new SimpleSynth()
//   this.pattern = new Tone.Pattern( (time, note) => {
//   this.synth.triggerAttackRelease(note, 0.25)
// }, this.state.musicArr);

// }

makeMusicNotes(str) {

  let musicNotes = []

  for (var x = 0; x < str.length; x++) {
    if (['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(str[x].toUpperCase())) {
      musicNotes.push(str[x].toUpperCase() + '4')
    // } else if (str[x].match(/[!.?]/)) {
    //   //rest
    // } else {
      //duration
    }
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

  console.log('this.state.text ', this.state.text)

  const notes = this.makeMusicNotes(this.state.text)

  console.log('this.state.musicArr ', this.state.musicArr)

  this.makeTone(notes)
  //StartAudioContext(Tone.context, 'buttonElement').then(function() { })
  Tone.Transport.start()
}




render() {
  return (
    <div>
      <Field
        text={this.state.text}
        handleSubmit={this.handleSubmit}
        writeText={this.writeText} />
    </div>
  )
}

}

