import React,{useState,useEffect} from 'react';
import axios from 'axios'

const MyContext = React.createContext(null)

function Father(props){
	const [data,setState] = useState({});
	const [loaderMsg,setLoaderMsg] = useState('Loading');
	useEffect(() => {
		axios.get('https://corona-api.com/countries')
		.then(response => {
			const {data} = response.data;
			setState({data,})
		})
		.catch(e => {
			console.log(e);
			setLoaderMsg('Network error!!Please reload the page.');
		})
	});

	return (
		<React.Fragment>
			<MyContext.Provider value={{...data,loaderMsg}}>
				{props.children}
			</MyContext.Provider>
		</React.Fragment>
	);
}

export {MyContext,Father};