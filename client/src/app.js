import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home';
import Navigation from './components/navigation';
import Register from './components/register';
import Dashboard from './components/dashboard/dashboard';
function App(){
	return(
		<Router>
			<Switch>
				<Route exact path="/">
					<Navigation/>
					<Home/>
				</Route>
				<Route exact path="/register">
					<Navigation/>
					<Register/>
				</Route>
				<Route exact path="/dashboard">
					<Dashboard/>
				</Route>
			</Switch>
		</Router>
	);
}
export default App;