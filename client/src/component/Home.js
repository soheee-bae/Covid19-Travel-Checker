import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import CountUp from "react-countup";

const Home = () => {
  //Fetching the data from api for overall us dashboard.
  const [dashboard, setDashboard] = useState([{}]);
  const [dateChecked, setDateChecked] = useState("");
  const [positive, setPositive] = useState("");
  const [tested, setTested] = useState("");
  const [recovered, setRecovered] = useState("");
  const [death, setDeath] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const result = await axios(
        "https://api.covidtracking.com/v1/us/current.json"
      );
      setDashboard(result.data[0]);
      setDateChecked(result.data[0].dateChecked);
      setPositive(result.data[0].positive);
      setTested(result.data[0].positive + result.data[0].negative);
      setRecovered(result.data[0].recovered);
      setDeath(result.data[0].death);
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
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
          value={search}
          type="search"
        />
      </div>
      <div className="mainContent">
        <div>Updated Time : {dateChecked}</div>
        <div>
          <h3>
            Confirmed :
            <FontAwesomeIcon className="arrow-up" icon={faArrowUp} />
            {dashboard.positiveIncrease}
          </h3>
          <CountUp end={positive} start={0} duration={4} separator="," />
        </div>
        <div>
          <h3>
            Tested : <FontAwesomeIcon className="arrow-up" icon={faArrowUp} />
            {dashboard.totalTestResultsIncrease}
          </h3>
          <CountUp end={tested} start={0} duration={4} separator="," />
        </div>
        <div>
          <h3>Recovered :</h3>
          <CountUp end={recovered} start={0} duration={4} separator="," />
        </div>
        <div>
          <h3>
            Deaths : <FontAwesomeIcon className="arrow-up" icon={faArrowUp} />
            {dashboard.deathIncrease}
          </h3>
          <CountUp end={death} start={0} duration={4} separator="," />
        </div>
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
