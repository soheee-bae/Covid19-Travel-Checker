import React, { useState, useEffect } from "react";
import { Chart } from 'react-charts'
import "../styles/Secondpage.css";
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
  const [stateAbrev, setStateAbrev] = useState("");

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

  const data = React.useMemo(
    () => [
      {
        label: 'Confirmed',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: 'Tested',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      },
      {
        label: 'Recovered',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      },
      {
        label: 'Deaths',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ],
    []
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'utc', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
 
  const lineChart = (
    <div
      style={{
        width: '500px',
        height: '305px'
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  )

  
  var x = 0;
  var stateArray = ["Alaska",
  "Alabama",
  "Arkansas",
  "American Samoa",
  "Arizona",
  "California",
  "Colorado",
  "Connecticut",
  "District of Columbia",
  "Delaware",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Iowa",
  "Idaho",
  "Illinois",
  "Indiana",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Massachusetts",
  "Maryland",
  "Maine",
  "Michigan",
  "Minnesota",
  "Missouri",
  "Northern Mariana Islands",
  "Mississippi",
  "Montana",
  "North Carolina",
  "North Dakota",
  "Nebraska",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "Nevada",
  "New York",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Virginia",
  "Virgin Islands",
  "Vermont",
  "Washington",
  "Wisconsin",
  "West Virginia",
  "Wyoming"];

  var arrayLength = stateArray.length;
  for (var i = 0; i < arrayLength; i++) {
    //console.log(stateArray[i]);
    if (stateArray[i] === stateName) {
      x = i;
      break;
    }
  
}
  
  useEffect(() => {
    const fetchdata = async () => {
      const result = await axios(
        "https://api.covidtracking.com/v1/states/current.json"
      );
      setDashboard(result.data[x]);
      setDateChecked(result.data[x].dateChecked);
      setPositive(result.data[x].positive);
      setTested(result.data[x].positive + result.data[x].negative);
      setRecovered(result.data[x].recovered);
      setDeath(result.data[x].death);
      setStateAbrev(result.data[x].stateAbrev)
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
        
              {/*This section is just for the arrow to previous and next pages*/}
      <div className="arrow-icon">
          
      <Link to="/" style={{ textDecoration: "none" }}>
          
        <FontAwesomeIcon icon={faAngleLeft} />
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link
        to="/restrictions-on-travelers"
        style={{ textDecoration: "none" }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </Link>
    </div>

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

      <div className="graph">
      {lineChart}
      </div>


    </div>
  );
};

export default Secondpage;
