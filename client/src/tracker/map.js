import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { DataContext } from "./context";
import { Box } from "@chakra-ui/core";
import Marker from "./marker";
import PopupText from "./popup";
import "./css/map.css";

const accessToken =
  "pk.eyJ1IjoiaW1hemhhcnVsIiwiYSI6ImNqdzVhemZneDA3a2Y0YWx3ZDk3bXBqcGQifQ.eDsWVk3yM8P3qM5jFwrUTA";
mapboxgl.accessToken = accessToken;

class CovidMap extends React.Component {
  componentDidMount() {
    const { covidData = [] } = this.context;

    const map = new mapboxgl.Map({
      container: this.mapRef,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [0, 0],
      zoom: 2.5,
    });
    //add control
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    // add markers
    covidData.forEach((marker) => {
      const el = document.createElement("div");
      const el2 = document.createElement("div");
      ReactDOM.render(<Marker />, el);
      ReactDOM.render(<PopupText name={marker.name} />, el2);

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeOnClick: true,
        closeButton: false,
      });
      popup.setDOMContent(el2).setMaxWidth("200px");

      new mapboxgl.Marker({ element: el })
        .setLngLat([marker.coordinates.longitude, marker.coordinates.latitude])
        .setPopup(popup)
        .addTo(map);
    });
  }
  render() {
    return (
      <Box
        ml="2"
        mr="2"
        width={["50%", "0%", "50%", "50%"]}
        display={["block", "none", "block", "block"]}
        h="100vh"
        ref={(el) => (this.mapRef = el)}
      ></Box>
    );
  }
}

CovidMap.contextType = DataContext;

export default CovidMap;
