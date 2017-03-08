import React from 'react'


export default (props) => {

return(
    <div id="div_bpm">
      <div>
        <form>

          <fieldset id="bpmfieldset">
            <legend>bpm : <span className="span_num">{props.bpm}</span></legend>

            <input
              type="range"
              name="points"
              value={props.bpm}
              onChange={props.onChangeBPM}
              min="2" max="350" />
          </fieldset>



        </form>
      </div>
    </div>
  )
}
