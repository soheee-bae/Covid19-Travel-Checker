import React, { useState, useEffect } from "react";
import {Line} from 'react-chartjs-2';
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

  /*
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
  } */

  let data = {
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
        data: [55, 79, 40, 71, 86, 35, 20, 55, 79, 40, 71, 86,]
      }
    ]
  };

  let data2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
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
      }
    ]
  };

  let data3 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
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
      }
    ]
  };

  let data4 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
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

  function graphIncrease(dataSet,val) {
      dataSet.datasets.data = [20, 30, 40];
      return dataSet.datasets.data;
  }

  /*
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
  }, []); */
  let abbrev = new Map();
  abbrev["Alabama"] = "AL";
  abbrev["Alaska"] = " AK";
  abbrev["American Samoa"] = "AS";
  abbrev["Arizona"] = "AZ";
  abbrev["Arkansas"] = "AR";
  abbrev["California"] = "CA";
  abbrev["Colorado"] = "CO";
  abbrev["Connecticut"] = "CT";
  abbrev["Delaware"] = "DE";
  abbrev["District Of Columbia"] = "DC";
  abbrev["Florida"] = "FL";
  abbrev["Georgia"] = "GA";
  abbrev["Guam"] = "GU";
  abbrev["Hawaii"] = "HI";
  abbrev["Idaho"] = "ID";
  abbrev["Illinois"] = "IL";
  abbrev["Indiana"] = "IN";
  abbrev["Iowa"] = "IA";
  abbrev["Kansas"] = "KS";
  abbrev["Kentucky"] = "KY";
  abbrev["Louisiana"] = "LA";
  abbrev["Maine"] = "ME";
  abbrev["Maryland"] = "MD";
  abbrev["Massachusetts"] = "MA";
  abbrev["Michigan"] = "MI";
  abbrev["Minnesota"] = "MN";
  abbrev["Mississippi"] = "MS";
  abbrev["Missouri"] = "MO";
  abbrev["Montana"] = "MT";
  abbrev["Nebraska"] = "NE";
  abbrev["Nevada"] = "NV";
  abbrev["New Hampshire"] = "NH";
  abbrev["New Jersey"] = "NJ";
  abbrev["New Mexico"] = "NM";
  abbrev["New York"] = "NY";
  abbrev["North Carolina"] = "NC";
  abbrev["North Dakota"] = "ND";
  abbrev["Northern Mariana Is"] = "MP";
  abbrev["Ohio"] = "OH";
  abbrev["Oklahoma"] = "OK";
  abbrev["Oregon"] = "OR";
  abbrev["Pennsylvania"] = "PA";
  abbrev["Puerto Rico"] = "PR";
  abbrev["Rhode Island"] = "RI";
  abbrev["South Carolina"] = "SC";
  abbrev["South Dakota"] = "SD";
  abbrev["Tennessee"] = "TN";
  abbrev["Texas"] = "TX";
  abbrev["Utah"] = "UT";
  abbrev["Vermont"] = "VT";
  abbrev["Virginia"] = "VA";
  abbrev["Virgin Islands"] = "VI";
  abbrev["Washington"] = "WA";
  abbrev["West Virginia"] = "WV";
  abbrev["Wisconsin"] = "WI";
  abbrev["Wyoming"] = "WY";

  useEffect(() => {
    const fetchdata = async () => {
      const result = await axios("http://localhost:3500/states/" + abbrev[stateName]);
      //setDashboard(result.data[x]);
      //setDateChecked(result.data[x].dateChecked);
      setPositive(result.confirmed);
      setTested(result.tested);
      setRecovered(result.recovered);
      setDeath(result.deaths);
      setStateAbrev(abbrev[stateName]);
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
      <div className="mainContent-area">
      <div className="tester">
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
      </div>
      {/*data.datasets.data = graphIncrease(data, dashboard.deathIncrease)}
      {//data.datasets.data*/}
      <div className="graph">
      <Line 
        data={data}
        width={500}
        height={250}
        options={{ maintainAspectRatio: false }}
      />
      </div> 
      <div className="graph2">
       <Line 
        data={data2}
        width={500}
        height={250}
        options={{ maintainAspectRatio: false }}
      />
    </div>
    <div className="graph3">
      <Line 
        data={data3}
        width={500}
        height={250}
        options={{ maintainAspectRatio: false }}
      />
      </div> 
      <div className="graph4">
       <Line 
        data={data4}
        width={500}
        height={250}
        options={{ maintainAspectRatio: false }}
      />
    </div> 
    </div>
);
};

export default Secondpage;
