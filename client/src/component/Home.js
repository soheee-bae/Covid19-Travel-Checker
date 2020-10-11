import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import stateList from "../stateList/StateList.json";

import axios from "axios";
import CountUp from "react-countup";

const Home = (props) => {
  //Fetching the data from api for overall us dashboard.
  const [dashboard, setDashboard] = useState([{}]);
  const [dateChecked, setDateChecked] = useState("");
  const [positive, setPositive] = useState("");
  const [tested, setTested] = useState("");
  const [recovered, setRecovered] = useState("");
  const [death, setDeath] = useState("");
  const [search, setSearch] = useState("");

  const HandleonChange = (search) => {
    setSearch(search);
    props.history.push({
      pathname: "/state-covid19-dashboard",
      state: { state: search.value },
    });
  };

  const searchList = stateList.map(({ State }) => {
    return { value: State, label: State };
  });
  const customStyles = {
    control: (base, state) => ({
      ...base,
      fontSize: 16,
      border: state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      cursor: "text",
      borderRadius: 5,
      padding: 4,
    }),

    option: (styles, { isFocused }) => {
      return {
        ...styles,
        cursor: "pointer",
        backgroundColor: isFocused ? "white" : "white",
        color: isFocused ? "rgba(255, 80, 86)" : "black",
        lineHeight: 2,
        fontSize: 14,
      };
    },

    input: (styles) => ({
      ...styles,
      color: "black",
    }),

    menu: (styles) => ({
      ...styles,
      marginTop: 0,
      boxShadow: "none",
      borderRadius: 0,
      borderTop: "solid 1px",
    }),

    singleValue: (styles) => ({
      ...styles,
      color: "rgba(255, 80, 86)",
    }),
  };
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
        <Select
          options={searchList}
          placeholder="Search the state..."
          openMenuOnClick={false}
          className="search-bar"
          styles={customStyles}
          onChange={HandleonChange} 
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
    </div>
  );
};

export default Home;
