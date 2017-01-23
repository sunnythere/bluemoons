import React from 'react'


export default (props) => {


return(
    <div id="div_options">
      <div>
        <form onSubmit={props.onSubmitVoice}>

          <fieldset>
            <legend>voice : {props.voice}</legend>

            <select value={props.voice} onChange={props.onChangeVoice}>
                <option value="ecello">Electric Cello</option>
                <option value="glass">Glass</option>
                <option value="pluck">Pluck</option>
                <option value="synth">Synth</option>

            </select>
          </fieldset>

        </form>
      </div>
    </div>
  )
}

