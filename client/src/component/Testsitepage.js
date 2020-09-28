import React from "react";
import "../styles/Testsitepage.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const Testsitepage = () => {
  return (
    //This is the Test site location page. It will have test site locations for chosen state.
    //Use the 'styles/Testsitepage.css' to style this page.
    <div className="Testsitepage">
      <div className="mainContent">
        {
          /* test site locations here */
          <h1>Test Site Locations</h1>
        }
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
