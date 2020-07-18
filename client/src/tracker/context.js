import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./loader";
export const DataContext = React.createContext();

export function DataComponent({ children }) {
  const [covidData, setData] = useState([]);
  const [latestData, setLatestData] = useState([]);
  const [statistics, setStatisticsData] = useState([]);
  const [loadingMsg, setLoadingMsg] = useState("");

  useEffect(() => {
    axios
      .get("https://corona-api.com/countries")
      .then((response) => {
        const { data } = response.data;
        data.sort((a, b) => a.latest_data.confirmed < b.latest_data.confirmed);
        setData([...covidData, ...data]);
        setLatestData([...latestData, ...data]);
        setStatisticsData([...statistics, ...data]);
      })
      .catch(() => {
        setLoadingMsg("Network Error!!");
      });
  }, []);

  function countryFinder(e) {
    const value = e.target.value;
    const filterCountry = covidData.filter(
      (country) => country.name.indexOf(value) !== -1
    );
    setLatestData([...filterCountry]);
  }

  function countryStaticFinder(e) {
    const value = e.target.value;
    const filterCountryStatic = covidData.filter(
      (country) => country.name.indexOf(value) !== -1
    );
    setStatisticsData([...filterCountryStatic]);
  }

  return (
    <DataContext.Provider
      value={{
        covidData,
        latestData,
        statistics,
        handlers: {
          countryFinder,
          countryStaticFinder,
        },
      }}
    >
      {covidData.length === 0 && <Loader loadingMsg={loadingMsg} />}
      {covidData.length > 0 && children}
    </DataContext.Provider>
  );
}
