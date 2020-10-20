import React, { useState, useEffect } from "react";
import {Line} from 'react-chartjs-2';
import { Chart } from "react-charts";
import "../styles/Secondpage.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import CountUp from "react-countup";
import { render } from "@testing-library/react";


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

  const [dateCheckedGraph, setDateCheckedGraph] = useState("");
  const [positiveGraph, setPositiveGraph] = useState("");
  const [testedGraph, setTestedGraph] = useState("");
  const [recoveredGraph, setRecoveredGraph] = useState("");
  const [deathGraph, setDeathGraph] = useState("");


  var x = 0;
  var stateArray = [
    "Alaska",
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
    "Wyoming",
  ];

  var arrayLength = stateArray.length;
  for (var i = 0; i < arrayLength; i++) {
    if (stateArray[i] === stateName) {
      x = i;
      break;
    }
  }

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Confirmed',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(255, 7, 58, 0.6)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255, 7, 58, 0.6)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255, 7, 58, 0.6)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56]
      },
      {
        label: 'Tested',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(7, 32, 255, 0.6)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(7, 32, 255, 0.6)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(7, 32, 255, 0.6)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [55, 79, 40, 71, 86, 35, 20, 55, 79, 40, 71, 86,]
      },
      {
        label: 'Recovered',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#28a745',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#28a745',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#28a745',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [75, 99, 50, 31, 66, 75, 60, 75, 99, 50, 31, 66]
      },
      {
        label: 'Deaths',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(108, 117, 125, 0.6)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(108, 117, 125, 0.6)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(108, 117, 125, 0.6)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [15, 29, 70, 61, 86, 45, 90, 15, 29, 70, 61, 86]
      }
    ]
  };

  useEffect(() => {
    const fetchdata = async () => {
      const result = await axios(
        "https://api.covidtracking.com/v1/states/daily.json"
      );
      setDashboard(result.data[x]);
      setDateChecked(result.data[x].dateChecked);
      setPositive(result.data[x].positive);
      setTested(result.data[x].positive + result.data[x].negative);
      setRecovered(result.data[x].recovered);
      setDeath(result.data[x].death);
      setStateAbrev(result.data[x].stateAbrev);

      setDateCheckedGraph(result.data[x].dateCheckedGraph);
      setPositiveGraph(result.data[x].positiveGraph);
      setTestedGraph(result.data[x].positiveGraph + result.data[x].negativeGraph);
      setRecoveredGraph(result.data[x].recoveredGraph);
      setDeathGraph(result.data[x].deathGraph); 

    };
    const savedata = () => {};
    fetchdata();
    savedata();
  }, []); 
/*
  const getPositive = React.useCallback(positive)

let data = React.useMemo(
    () => [
      {
        label: "Confirmed",
        data: [
          [0, getPositive],
          [1, getPositive],
          [2, 4],
          [3, 2],
          [4, getPositive],
        ],
      },
      {
        label: "Tested",
        data: [
          [0, 3],
          [1, 1],
          [2, 5],
          [3, 6],
          [4, 4],
        ],
      },
      {
        label: "Recovered",
        data: [
          [0, 3],
          [1, 1],
          [2, 5],
          [3, 6],
          [4, 4],
        ],
      },
      {
        label: "Deaths",
        data: [
          [0, 3],
          [1, 1],
          [2, 5],
          [3, 6],
          [4, 4],
        ],
      },
    ],
    []
  ); 

  let data = (
    () => [ {
      data: [
        [1,0],
        [1,2],
        [1,3],
        [1,4],
        [1,5],
      ]
    }] 
  );

  const getLabel = React.useCallback(series => series.label, [])

  const axes = React.useMemo(
    () => [
      { primary: true, type: "utc", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  const lineChart = (
    <div
      style={{
        width: "500px",
        height: "305px",
      }}
    >
      <Chart data={data} getLabel = {getLabel} axes={axes} />
    </div>
  ); */
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
      <Line 
        data={data}
        width={500}
        height={300}
        options={{maintainAspectRatio: false}}
      />
    </div> {/*
    <div className="graph">
      <Line 
        data={data}
        width={500}
        height={300}
        options={{maintainAspectRatio: false}}
      />
    </div> */}
    </div>
);
};
//<div className="graph">{lineChart}</div>
export default Secondpage;
