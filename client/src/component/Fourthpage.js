import React, {useContext}  from "react";
import "../styles/Fourthpage.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {stateContext} from '../App'
import restrictions from "../restrictions/restrictions.json";

const Fourthpage = () => {
  const {selectedState, setSelectedState} = useContext(stateContext);
  
  return (
    //This is the Fourth page. It will have Travel restrictions for chosen state.
    //Use the 'styles/Fourthpage.css' to style this page.
    <div className="Fourthpage">
      <div className="mainContent">
          <h1>Travel Restrictions</h1>
          <h2>{selectedState}</h2>
      </div>

      {/*This section is just for the arrow to previous and next pages*/}
      <div className="leftarrow">
        <Link
          to="/restrictions-on-travelers"
          style={{ textDecoration: "none" }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      </div>
      <div className="rightarrow">
        <Link to="/test-site-location" style={{ textDecoration: "none" }}>
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </div>
    </div>
  );
};

export default Fourthpage;
