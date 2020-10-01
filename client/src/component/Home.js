import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import CountUp, { useCountUp } from "react-countup";

const Home = () => {
  //Fetching the data from api for overall us dashboard.
  const [dashboard, setDashboard] = useState([{}]);
  const [num, setNum] = useState(0);
  console.log(dashboard);
  console.log(dashboard);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await axios(
        "https://api.covidtracking.com/v1/us/current.json"
      );
      setDashboard(result.data[0]);
    };
    const savedata = () => {};
    fetchdata();
    savedata();
  }, []);
  return (
    //This is the Home page. It will have search bar and United State COVID-19 dashboard.
    //when the user search for the state and click submit, it will go to the next page(COVID-19 dashboard for chosen states)
    //Use the 'styles/Home.css' to style this page.
    <div className="Homepage">
      <div className="search-form">
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        <input className="search-bar" type="search" />
      </div>
      <div className="mainContent">
        <h3>Updated Time : {dashboard.dateChecked}</h3>
        <h3>Confirmed:{dashboard.positive}</h3>
        <h3>Tested :{dashboard.positive + dashboard.negative}</h3>
        <h3>Recovered : {dashboard.recovered}</h3>
        <h3>Death : {dashboard.death}</h3>
        <h3>Death Increase : {dashboard.deathIncrease}</h3>
        <h3>Positive Increase : {dashboard.positiveIncrease}</h3>
      </div>
      {/*This section is just for the arrow to previous and next pages*/}
      <div className="rightarrow">
        <Link to="/state-covid19-dashboard" style={{ textDecoration: "none" }}>
          <FontAwesomeIcon className="arrow-icon" icon={faAngleRight} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
