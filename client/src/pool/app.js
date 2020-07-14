import React from 'React'
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';
import Home from './home';
import Pool from './pool'
import NotFound from './404'
function App(){
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home/>
				</Route>
				<Route path="/pools/:id">
					<Pool/>
				</Route>
				<Route path="/*">
					<NotFound msg="Bad Request. Don't have any content in this page."/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;