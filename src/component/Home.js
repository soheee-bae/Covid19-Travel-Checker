import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Home = () => {
  //Fetching the data from api for overall us dashboard.
  const [dashboard, setDashboard] = useState([{}]);
  console.log(dashboard);
  useEffect(() => {
    const fetchdata = async () => {
      const result = await axios(
        "https://api.covidtracking.com/v1/us/current.json"
      );
      setDashboard(result.data[0]);
    };
    fetchdata();
  }, []);
  return (
    //This is the Home page. It will have search bar and United State COVID-19 dashboard.
    //when the user search for the state and click submit, it will go to the next page(COVID-19 dashboard for chosen states)
    //Use the 'styles/Home.css' to style this page.
    <div className="Homepage">
      <div className="mainContent">
        <h3>Updated Time : {dashboard.dateChecked}</h3>
        <h3>Confirmed: {dashboard.positive}</h3>
        <h3>Tested : {dashboard.positive + dashboard.negative}</h3>
        <h3>Recovered : {dashboard.recovered}</h3>
        <h3>Death : {dashboard.death}</h3>
      </div>
      {/*This section is just for the arrow to previous and next pages*/}
      <div className="rightarrow">
        <Link to="/state-covid19-dashboard" style={{ textDecoration: "none" }}>
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
