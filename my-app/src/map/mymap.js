import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import Marker from './marker'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


class MyMap extends Component {
	componentDidMount(){
		const map = new mapboxgl.Map({
			container:this.mapRef,
			style:'mapbox://styles/mapbox/dark-v10',
			center:[0,0],
			zoom:2.5,
		});
			//add control
		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
		// add markers
		this.props.data.forEach(marker => {
			const el = document.createElement('div');
			ReactDOM.render(<Marker/>, el);
			const popup = new mapboxgl.Popup({offset:25,closeOnClick:true,closeButton:false});
			popup.setHTML(`
				<strong>${marker.name}</strong>
				<br/>
				<img style="width:40px;height:40px;" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/${marker.code.toLowerCase()}.svg" /><br>
				<a href="#${marker.name}">Info</a> 
				<a href="#${marker.name+'stat'}">Statistics</a><br/>
				<strog>Click on the Info or Statistics button to see details<strong>
				`);
			new mapboxgl.Marker({element:el})
			.setLngLat([marker.coordinates.longitude,marker.coordinates.latitude])
			.setPopup(popup)
			.addTo(map);
		})
	}
	render(){
		return <div className="mymap" ref={el => this.mapRef = el}></div>
	}
}

export default MyMap;