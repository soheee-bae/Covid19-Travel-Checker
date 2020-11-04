import React, { useState, useEffect, useContext } from "react";
import "../styles/Home.css";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import stateList from "../stateList/StateList.json";
import {stateContext} from '../App'


import axios from "axios";
import CountUp from "react-countup";

const Home = (props) => {
  const {selectedState, setSelectedState} = useContext(stateContext);

  const [dashboard, setDashboard] = useState([{}]);
  const [dateChecked, setDateChecked] = useState("");
  const [positive, setPositive] = useState("");
  const [tested, setTested] = useState("");
  const [recovered, setRecovered] = useState("");
  const [death, setDeath] = useState("");


  const HandleonChange = (search) => {
    setSelectedState(search.value);
    props.history.push({
      pathname: "/state-covid19-dashboard",
    });
  };

  const searchList = stateList.map(({ State }) => {
    return { value: State, label: State };
  });

  const customStyles = {
    control: (base, state) => ({
      ...base,
      fontSize: 14,
      border: state.isFocused ? 0 : 0,
      cursor: "text",
      borderRadius: 5,
      width: "40vw",
      minWidth:"300px",
      height: "3rem",
      padding:"0 1rem",
      boxShadow: "0 10px 35px rgba(0,0,0,.2)",
      color:"#6c757d",
      outline: "none",
      marginTop: "1rem",

    }),

    option: (styles, { isFocused }) => {
      return {
        ...styles,
        cursor: "pointer",
        backgroundColor: isFocused ? "white" : "white",
        color: isFocused ? "rgba(255, 80, 86)" : "black",
        lineHeight: 2,
        fontSize: 14,
        width: "40vw",
        height: "3rem",
        minWidth:"300px",  zIndex:'0',
      };
    },

    input: (styles) => ({
      ...styles,
      color: "black",
      width: "40vw",
      fontSize:14,
      minWidth:"300px",  zIndex:'0',

    }),

    menu: (styles) => ({
      ...styles,
      marginTop: '1rem',
      boxShadow: "none",
      borderRadius: 0,
      borderTop: "solid 1px",
      width: "40vw",
      height: "3rem",
      minWidth:"300px",  zIndex:'0',
    }),

    singleValue: (styles) => ({
      ...styles,
      color: "rgba(255, 80, 86)",
      width: "40vw",
      height: "3rem",
      minWidth:"300px",  zIndex:'0',
    }),
  };

  useEffect(() => {
    setSelectedState("")
    const fetchdata = async () => {
      const result = await axios.get(
        "http://localhost:3500/states/total"
      );
        console.log(result)
      setPositive(result.data.positive);
      setTested(result.data.negative + result.data.positive);
      setRecovered(result.data.recovered);
      setDeath(result.data.deaths);

      setDashboard(result.data);
  //    setDateChecked(result.data[0].dateChecked);
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
        <p className="Homepage-title">Where are you going?</p>
        <Select
          options={searchList}
          placeholder="Search the state"
          openMenuOnClick={false}
          className="search-bar"
          styles={customStyles}
          onChange={HandleonChange}
        />
      </div>
      <div className="mainContent-area">
        <div className="title-container">
          <p className="homepage-title">UNITED STATES</p>
          
        </div>
        <div className="US-Covid-data">
          <div className="US-Covid-data-first">
            <div className="Confirmed-US">
              <p className="Confirmed-subtitle">Confirmed</p>
              <div className="Confirmed-increased">
                <FontAwesomeIcon className="arrow-up" icon={faArrowUp} />
                {dashboard.positiveIncrease}
              </div>
              <CountUp
                className="Countup-data"
                end={positive}
                start={0}
                duration={4}
                separator=","
              />
            </div>
            <div className="Tested-US">
              <p className="Tested-subtitle">Tested</p>
              <div className="Tested-increased">
                <FontAwesomeIcon className="arrow-up" icon={faArrowUp} />
                {dashboard.positiveIncrease+dashboard.negativeIncrease}
              </div>
              <CountUp
                className="Countup-data"
                end={tested}
                start={0}
                duration={4}
                separator=","
              />
            </div>
          </div>
          <div className="US-Covid-data-second">
            <div className="Recovered-US">
              <p className="Recovered-subtitle">Recovered</p>
              <div className="Recovered-increased ">
                <FontAwesomeIcon className="arrow-up" icon={faArrowUp} />
                {dashboard.recovered}</div>
              <CountUp
                className="Countup-data"
                end={recovered}
                start={0}
                duration={4}
                separator=","
              />
            </div>
            <div className="Deaths-US">
              <p className="Deaths-subtitle">Deaths</p>
              <div className="Deaths-increased">
                <FontAwesomeIcon className="arrow-up" icon={faArrowUp} />
                {dashboard.deathIncrease}
              </div>
              <CountUp
                className="Countup-data"
                end={death}
                start={0}
                duration={4}
                separator=","
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
