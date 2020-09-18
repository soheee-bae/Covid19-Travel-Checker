import React from "react";
import "../styles/Secondpage.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const Secondpage = () => {
  return (
    //This is the Second page. It will have COVID-19 dashboard for chosen state.
    //Use the 'styles/Secondpage.css' to style this page.
    <div className="Secondpage">
      <div className="mainContent">
        {
          /* COVID-19 dashboard here */
          <h1>Chosen state's dashboard</h1>
        }
      </div>

      {/*This section is just for the arrow to previous and next pages*/}
      <div className="leftarrow">
        <Link to="/" style={{ textDecoration: "none" }}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      </div>
      <div className="rightarrow">
        <Link
          to="/restrictions-on-travelers"
          style={{ textDecoration: "none" }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </div>
    </div>
  );
};

export default Secondpage;
