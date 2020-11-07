import React, { useContext, useState, useEffect } from "react";
import "../styles/Thirdpage.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {stateContext} from '../App'
import restrictions from "../restrictions/restrictions.json";

const Thirdpage = () => {

  const {selectedState, setSelectedState} = useContext(stateContext);
  const [travelerRestrictions, setTravelerRestrictions] = useState({});
  const [airlineEntry, SetEntry] = useState([]);
  console.log(airlineEntry);
  


  useEffect(() => {
    restrictions.map((travelerRestriction) => {
      if (travelerRestriction.State === selectedState) {
        setTravelerRestrictions(travelerRestriction);
        SetEntry(travelerRestriction.TravelerRestrictions);
        
      } else {
        return null;
      }
    });
  }, []); 

  return (
    //This is the Third page. It will have restrictions on travelers who arrive the chosen states.
    //Use the 'styles/Thirdpage.css' to style this page.
    
    <div className="Thirdpage">
        <div className="left-arrow-icon">
          <Link to="/state-covid19-dashboard" style={{ textDecoration: "none", color:"black"}}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Link>
          </div>
      <div className="mainContent-area">
          <h1>Restrictions on Travelers</h1>
          <h2>{selectedState}</h2>
          <h3>{airlineEntry}</h3>
      </div>

      {/*This section is just for the arrow to previous and next pages*/}
      <div className="right-arrow-icon">
          <Link to="/state-travel-restrictions" style={{ textDecoration: "none",color:"black" }}>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
      </div>
    </div>
  );
};

export default Thirdpage;
