import React from 'react'


export default (props) => {

return(
    <div id="div_options">
      <div>
        <form>
        <fieldset>
          <legend>bpm: {props.bpm}</legend>

          <input
            type="range"
            name="points"
            value={props.bpm}
            onChange={props.watchBPM}
            min="20" max="250" />


        {
          // <br />

          // <input
          //   type="range"
          //   name="ramp"
          //   value={props.ramp}
          //   onChange={props.watchBPMramp}
          //   min="1" max="10" />
          // {props.ramp}
        }

        </fieldset>
        </form>
      </div>
    </div>
  )
}
