import React from 'react'


export default (props) => {


return(
    <div id="div_options">
      <div>
        <form>

          <fieldset>
            <legend>pattern : {props.pattern}</legend>

            <select value={props.pattern} onChange={props.onChangePattern}>
                <option value=""></option>
                <option value="original">Original</option>
                <option value=""></option>
                <option value=""></option>

            </select>
          </fieldset>

        </form>
      </div>
    </div>
  )
}

