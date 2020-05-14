import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card'

function RightSide(props) {
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
				<h3>More statistics</h3>
				<input onChange={finder} className="form-control" type="text" placeholder="Search"/>
			</div>
			<div className="allCards">
				<div>
					{
						allCountries.map(country => {
							const recoveryRate = country.latest_data.calculated.recovery_rate;
							const deathRate = country.latest_data.calculated.death_rate;
							const millionCases = country.latest_data.calculated.cases_per_million_population
							return (
								<Card key={country.name} id={country.name+'stat'} text="white" bg="dark" style={{ width: '100%', marginBottom:'5px'}}>
								  <Card.Body>
								  <Card.Title>{country.name}</Card.Title>
								  	<p>Cases/1 million pop. : <strong className="text-info">{millionCases}</strong></p>
								  	<p>Recovery rate : <strong className="text-success">{recoveryRate ? recoveryRate : 'Unknown' }</strong></p>
								  	<p>Death rate : <strong className="text-danger">{deathRate ? deathRate : 'Unknown'}</strong></p>
								  </Card.Body>
						  		</Card>
							)
						})
					}
				</div>
			</div>
		</React.Fragment>
	);
}

export default RightSide;


