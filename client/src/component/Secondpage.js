import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import CountUp from "react-countup";

const Secondpage = (props) => {
  //This is selected state from Homepage!!
  const location = useLocation();
  const selectedState = location.state.state;
  //'selectedState' is the state selected by user from homepage!!

  const [dashboard, setDashboard] = useState([{}]);
  const [dateChecked, setDateChecked] = useState("");
  const [positive, setPositive] = useState("");
  const [tested, setTested] = useState("");
  const [recovered, setRecovered] = useState("");
  const [death, setDeath] = useState("");
  const [stateName, setStateName] = useState(selectedState);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await axios(
        "https://api.covidtracking.com/v1/states/current.json"
      );
      setDashboard(result.data[0]);
      setDateChecked(result.data[0].dateChecked);
      setPositive(result.data[0].positive);
      setTested(result.data[0].positive + result.data[0].negative);
      setRecovered(result.data[0].recovered);
      setDeath(result.data[0].death);
      //setStateName(result.data[0].state);
    };
    const savedata = () => {};
    fetchdata();
    savedata();
  }, []);
  return (
    //This is the Second page. It will have COVID-19 dashboard for chosen state.
    //Use the 'styles/Secondpage.css' to style this page.
    <div className="Secondpage">
      <div className="mainContent">
        <div>Updated Time : {dateChecked}</div>
        <div>
          {/* COVID-19 dashboard here */}
          <h1>State: {stateName}</h1>
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
      <div className="leftarrow">
        <Link to="/" style={{ textDecoration: "none" }}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      </div>
      <div className="rightarrow">
        <Link
          to="/restrictions-on-travelers"
          style={{ textDecoration: "none" }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </div>
    </div>
  );
};

export default Secondpage;
