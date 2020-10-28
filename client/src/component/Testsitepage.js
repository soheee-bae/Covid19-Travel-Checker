import React,{useContext}  from "react";
import "../styles/Testsitepage.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import {stateContext} from '../App'

const Testsitepage = () => {
  const {selectedState, setSelectedState} = useContext(stateContext);

  return (
    //This is the Test site location page. It will have test site locations for chosen state.
    //Use the 'styles/Testsitepage.css' to style this page.
    <div className="Testsitepage">
      <div className="mainContent">
          <h1>Test Site Locations</h1>
          <h2>{selectedState}</h2>
      </div>

      {/*This section is just for the arrow to previous and next pages*/}
      <div className="leftarrow">
        <Link
          to="/state-travel-restrictions"
          style={{ textDecoration: "none" }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      </div>
    </div>
  );
};

export default Testsitepage;
