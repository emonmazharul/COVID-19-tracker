import React from 'react'

function Viewer(props) {
	return (
		<React.Fragment>
			<h1>{props.name}</h1>
			<h1>Confirmed: {props.latest_data.confirmed}</h1>
			<h1>Recovered: {props.latest_data.recovered}</h1>
			<h1>Deaths: {props.latest_data.deaths}</h1>
		</React.Fragment>
	);
}

export default Viewer;