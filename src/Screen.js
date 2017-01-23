import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Tone from 'tone'


export default class Screen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      altText: [],
      altTextShow: [],
      letterClassA: 'underline',
      letterClassB: 'letters',

    }

    //this.lineLetters = this.lineLetters.bind(this)
  }


shouldComponentUpdate(nextProps, nextState) {
  if ((this.props.returnKey !== nextProps.returnKey) && (nextProps.text)){
      return true;
  }
  if (this.props.letterClassA !== nextProps.letterClassA ) {
    return true;
  } else {
    return false;
  }
}

componentWillReceiveProps(nextProps) {
this.lineLetters(nextProps.text)
  console.log("Tone.Transport.position ", Tone.Transport.position)
}


lineLetters(text) {
  const textArr = text.split('')
  const altText = []
  let oneNote = {}

  textArr.map( (char, idx) => {

    if (char.match(/[A-G]/i)) {
      altText.push(<span key={idx} className="underline">{char}</span>)
      oneNote.val = char
    } else if (char.match(/\s|[!.,;?]/)) {
      altText.push(<span key={idx} className={this.state.letterClassB}>{char}</span>)
      oneNote.val = ''
    } else {
        if (oneNote.val) {
          altText.push(<span key={idx} className="underline2">{char}</span>)
        } else {
           altText.push(<span key={idx} className={this.state.letterClassB}>{char}</span>)
        }
    }

    this.setState({ altText : altText })
})
  //this.notate()
}



// notate() {
// Tone.Transport.schedule((time) => {
//     const textArr = this.state.altText
//     let altTextShow;

// while (textArr.length) {
//   Tone.Transport.scheduleRepeat((time) => {
//   Tone.Draw.schedule(() => {
//     console.log('heyhey')
//     let charSpan = textArr.shift()

//     altTextShow.push(charSpan)

//     this.setState({ altTextShow: altTextShow })
//       console.log('altTextShow state', this.state.altTextShow)

//   }, time)
//   }, '16n')
// }

// }, "0:0:1")
// }



render() {

  return(
    <div id="div_screen">


      <ReactCSSTransitionGroup className="div_transition"
        transitionName="notate"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>

              {this.state.altText}

      </ReactCSSTransitionGroup>



            {
              // this.props.returnKey &&
              // <span id="span_text">
              // {
              //   textArr.map( (char, idx) => {
              //     if (char.match(/[A-G]/i)) {
              //       return <span key={idx} className="underline">{char}</span>
              //     } else {
              //       return <span key={idx}>{char}</span>
              //     }
              //   } )
              //}
              //</span>
            }



        {
        //state:   {this.state.text}
        }
    </div>
  )
}

}
