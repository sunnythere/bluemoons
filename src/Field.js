import React from 'react';


export default class Field extends React.Component {

  constructor(props) {
    super(props)
    this.focus = this.focus.bind(this)
  }

  focus() {
    this.textInput.focus();
  }

  render() {
  return (
    <div id="div_field">
      <form onSubmit={this.props.handleSubmit}>

        <input
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.holdtext}
          onChange={this.props.writeText}
          id="input-field"
          style={{opacity: this.props.disappearText}}
          ref={(input) => { this.textInput = input }} />

        <input type="submit" tabIndex="-1" />

      </form>
    </div>
  )
  }
}


