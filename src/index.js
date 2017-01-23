import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Main from './Main'
import Field from './Field'
import Options from './Options'
import Screen from './Screen'
import Book from './Book'


ReactDOM.render(
   	<Router history={browserHistory}>
   		<Route path='/' component={Main}>
        <Route path='/screen' component={Screen} />
   			<Route path='/field' component={Field} />
        <Route path='/options' component={Options} />

   		</Route>
      <Route path='/book' component={Book} />
   	</Router>,
  document.getElementById('anchor')
)
