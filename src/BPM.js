import React from 'react'


export default (props) => {

return(
    <div id="div_bpm">
      <div>
        <form>

          <fieldset>
            <legend>bpm: <span className="span_num">{props.bpm}</span></legend>

            <input
              type="range"
              name="points"
              value={props.bpm}
              onChange={props.onChangeBPM}
              min="20" max="250" />
          </fieldset>

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


        </form>
      </div>
    </div>
  )
}
