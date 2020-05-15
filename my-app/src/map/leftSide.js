import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card'

function LeftSide(props) {
	const [allCountries,getAllCountries] = useState([]);
	const [callEffect,setEffect] = useState(false);

	useEffect(() => {
		const modifyData = props.data.sort((a,b) => a.latest_data.confirmed < b.latest_data.confirmed);
		setEffect(false);
		getAllCountries(modifyData);
	},[callEffect,props.data])

	function finder(e){
		const {data} = props;
		if(e.target.value.length > 0) {
			const findCountry = data.filter(country => country.name.indexOf(e.target.value) !== -1);	
			getAllCountries(findCountry);
		} else {
			setEffect(true);
		} 
	}
	return (
		<React.Fragment>
			<div className="headerOne">
				<h3>Info</h3>
				<input onChange={finder} className="form-control" type="text" placeholder="Search"/>
			</div>
			<div className="allCards">
				{
					allCountries.map(country => (
						<Card key={country.name} id={country.name} text="white" bg="dark" style={{ width: '100%', marginBottom:'5px'}}>
						  <Card.Body>
						  <Card.Title>{country.name}</Card.Title>
						  	<p>Today's confirmed : <strong className="text-info">{country.today.confirmed}</strong></p>
						  	<p>Total confirmed : <strong className="text-info">{country.latest_data.confirmed}</strong></p>
					  		<p>Today's deaths : <strong className="text-danger">{country.today.deaths}</strong></p>
						  	<p>Total deaths : <strong className="text-danger">{country.latest_data.deaths}</strong></p>
						  	<p>Total recovered : <strong className="text-success">{country.latest_data.recovered}</strong></p>
						  	<p>Last update: <strong className="text-primary">{new Date(country.updated_at).toLocaleTimeString()}</strong></p>
						  </Card.Body>
				  		</Card>
					))
				}
			</div>
		</React.Fragment>
	);
}

export default LeftSide;