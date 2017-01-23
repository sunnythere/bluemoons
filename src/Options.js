import React from 'react'


export default (props) => {

return(
    <div id="div_options">
      <div>
        <form>

          <fieldset>
            <legend>voice: {props.instVal}</legend>

            <select name="instruments" value={props.instVal} onChange={props.onChangeVoice}>
                <option value="synth">Synth</option>
                <option value="glass">Glass</option>
                <option value="ecello">Electric Cello</option>
            </select>
          </fieldset>

        </form>
      </div>
    </div>
  )
}
