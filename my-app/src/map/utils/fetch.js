import axios from 'axios'

async function fetchData(){
	const response = await axios.get('https://corona-api.com/countries');
	const {data} = response.data;
	const modifyData = [];
	for(let i =0;i<data.length;i++) {
		const currentInd = data[i];
		modifyData.push({
			coordinates:[currentInd.coordinates.longitude,currentInd.coordinates.latitude],
			country:currentInd.name,
			code:currentInd.code.toLowerCase(),
			confirmed:currentInd.latest_data.confirmed,
			deaths:currentInd.latest_data.deaths,
			recovered:currentInd.latest_data.recovered,
		});
	}
	// end loop;
	return modifyData;
}

export default fetchData;