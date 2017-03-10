import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Tone from 'tone'




export default class Screen extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    displayText: [],
    nextLetter: ''
  }
  this.oneAtATime = this.oneAtATime.bind(this)
  //this.update = this.update.bind(this)
}


componentWillReceiveProps(nextProps) {
  this.oneAtATime(nextProps.text)
  console.log("Tone.Transport.position ", Tone.Transport.position)
}

oneAtATime() {
  // str.split('').reduce((prev, curr) => {
  //   setTimeout(function() {
  //     console.log('prev', prev)
  //     prev = prev.concat(curr)
  //     console.log('prev ', prev)
  //     this.setState({ displayText: prev })
  //   }.bind(this), 0)
  //   return prev

  // }, this.state.displayText)
  let text = document.getElementsByClassName('notate-enter-active')
  let millSec = Tone.Time('16n').toMilliseconds()
  for (let x = 0; x < text.length; x++) {
      text[x].style.transitionDelay = `${millSec*x}ms`
  }
  return text
}

// update(newText) {
//   this.setState({ displayText: newText })
// }


render() {

console.log('LOCAL STATE ', this.state)
  // let display = this.state.displayText.length ? this.state.displayText
  let oneNote = {}
  let display = this.props.text.split('').map((char, i) => {


    if (char.match(/[A-G]/i)) {
      oneNote.val = char
      return (
        <div key={i} className="letters underline">
          {char}
        </div>
      )
    } else if (char.match(/\s|[!.,;?]/)) {
      oneNote.val = ''
      return (
        <div key={i} className="letters">
          {char}
        </div>
      )
    } else {
      if (oneNote.val) {
        console.log('UNDERLINE2')
        return (
          <div key={i} className="underline2 letters">{char}</div>
        )
      } else {
        return (
          <div key={i} className="letters">{char}</div>
          //`${char}-${i}`
        )
      }
    }

  })

// console.log('display ', display)

this.oneAtATime()


return (
    <div id="div_screen">

      <ReactCSSTransitionGroup className="div_transition"
        transitionName="notate"
        transitionEnterTimeout={0}
        transitionLeave={false}>

              {display}

      </ReactCSSTransitionGroup>

    </div>
  )
}


}
