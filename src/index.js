import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Main from './Main'
import Field from './Field'


ReactDOM.render(
   	<Router history={browserHistory}>
   		<Route path='/' component={Main}>
   			<Route path='/field' component={Field} />
   		</Route>
   	</Router>,
  document.getElementById('anchor')
)
