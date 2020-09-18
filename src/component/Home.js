import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const Home = () => {
  return (
    //This is the Home page. It will have search bar and United State COVID-19 dashboard.
    //when the user search for the state and click submit, it will go to the next page(COVID-19 dashboard for chosen states)
    //Use the 'styles/Home.css' to style this page.
    <div className="Homepage">
      <div className="mainContent">
        {
          /* Search bar and United State COVID-19 dashboard here */ <h1>
            Home page
          </h1>
        }
      </div>

      {/*This section is just for the arrow to previous and next pages*/}
      <div className="rightarrow">
        <Link to="/state-covid19-dashboard" style={{ textDecoration: "none" }}>
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
