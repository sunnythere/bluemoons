import React from 'react';


export default (props) => {

  return (
    <div id="div_field">
      <form onSubmit={props.handleSubmit}>

        <input
          type="text"
          value={props.holdtext}
          onChange={props.writeText}
          className="input-field"
          style={{opacity: props.disappearText}}
          autoFocus />

        <input type="submit" tabIndex="-1" />

      </form>
    </div>
  )

}


