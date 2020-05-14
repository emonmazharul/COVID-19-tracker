import React from 'react'
import Spinner from 'react-bootstrap/Spinner'


function Loader(props){
	return (
		<React.Fragment>
			<div className="loader">
				<div className="loaderInfo">
					<h1 className={props.loaderMsg === 'Loading' ? 'text-dark' : 'text-danger'}>{props.loaderMsg}</h1>
				</div>
				<Spinner style={{display:props.loaderMsg === 'Loading' ?  '' : 'none'}} animation="border" variant="dark"/>
			</div>
		</React.Fragment>
	);
}

export default Loader;