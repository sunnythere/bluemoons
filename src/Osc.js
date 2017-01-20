import React from 'react'
import Tone from 'tone'



class Oscillator extends React.Component {

  constructor(props) {
    super(props);
    this.createTone();
  }

  createTone(){
    this.tone = new Tone.Oscillator({
      frequency: 440,
      type: this.props.type,
      volume: this.props.volume
    }).connect(this.props.envelope).start();
  }

  componentWillReceiveProps(newProps) {
    ['detune','volume'].forEach(prop => {
      if (this.props[prop] !== newProps[prop]) {
        this.tone[prop].value = newProps[prop];
      }
    });
    if (this.props.type !== newProps.type) {
      this.tone.type = newProps.type;
    }
    if (this.props.playing !== newProps.playing ) {
      this.tone.frequency.value = newProps.playing ;
    }
  }
}
