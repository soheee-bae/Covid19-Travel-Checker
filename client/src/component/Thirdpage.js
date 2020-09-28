import React from "react";
import "../styles/Thirdpage.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const Thirdpage = () => {
  return (
    //This is the Third page. It will have restrictions on travelers who arrive the chosen states.
    //Use the 'styles/Thirdpage.css' to style this page.
    <div className="Thirdpage">
      <div className="mainContent">
        {
          /* restrictions here */
          <h1>Restrictions on Travelers</h1>
        }
      </div>

      {/*This section is just for the arrow to previous and next pages*/}
      <div className="leftarrow">
        <Link to="/state-covid19-dashboard" style={{ textDecoration: "none" }}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      </div>
      <div className="rightarrow">
        <Link
          to="/state-travel-restrictions"
          style={{ textDecoration: "none" }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </div>
    </div>
  );
};

export default Thirdpage;
