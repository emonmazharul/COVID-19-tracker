import React,{useContext} from 'react'
import mapboxgl from 'mapbox-gl';
import {MyContext,Father} from './context'
import MyMap from './mymap'
import LeftSide from './utils/leftSide'
import RightSide from './rightSide'
import Loader from './loader'
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';

const accessToken = 'pk.eyJ1IjoiaW1hemhhcnVsIiwiYSI6ImNqdzVhemZneDA3a2Y0YWx3ZDk3bXBqcGQifQ.eDsWVk3yM8P3qM5jFwrUTA';
mapboxgl.accessToken = accessToken;

function App(){
	return (
		<Father>
			<Map/>
		</Father>
	)
}

function Map(){
	const contextData = useContext(MyContext);
	if(contextData.data){
		return (
		<React.Fragment>
			<div className="main">
				<div className="one">
					<LeftSide {...contextData}/>
				</div>
				<div className="map">
					<Header/>
					<MyMap {...contextData}/>
				</div>
				<div className="two">
					<RightSide {...contextData}/>
				</div>
			</div>
				
		</React.Fragment>
	);
	}
	return <Loader loaderMsg={contextData.loaderMsg}/>
}


function Header(){
	return (
		<div className="mainHeader">
			<div>
				<a href="https://github.com/emonmazharul"></a>
			</div>
			<div>
				<h3>COVID-19 Tracker</h3>
			</div>
		</div>
	);
}

export default App;