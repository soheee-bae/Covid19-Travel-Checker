import React, { useContext, useState, useEffect } from "react";
import "../styles/Thirdpage.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { stateContext } from "../App";
import restrictions from "../restrictions/restrictions.json";

const Thirdpage = () => {
  const { selectedState, setSelectedState } = useContext(stateContext);
  const [travelerRestrictions, setTravelerRestrictions] = useState({});
  const [airlineEntry, SetEntry] = useState([]);
  const [border, SetBorder] = useState([]);
  const [curfew, SetCurfew] = useState([]);
  const [mask, SetMask] = useState([]);
  const [stores, SetStores] = useState([]);
  const [restaurants, SetRestaurants] = useState([]);
  const [selectedStateUpper, SetUpper] = useState([]);
  console.log(airlineEntry);

  useEffect(() => {
    restrictions.map((travelerRestriction) => {
      if (travelerRestriction.State === selectedState) {
        setTravelerRestrictions(travelerRestriction);
        SetEntry(travelerRestriction.TravelerRestrictions);
        SetBorder(travelerRestriction.BorderClosure);
        SetCurfew(travelerRestriction.Curfew);
        SetMask(travelerRestriction.MaskRequirement);
        SetStores(travelerRestriction["NonEssentialStores Open"]);
        SetRestaurants(travelerRestriction.RestaurantsOpen);
        SetUpper(selectedState.toUpperCase());
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
        <Link
          to="/state-covid19-dashboard"
          style={{ textDecoration: "none", color: "black" }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      </div>
      <div className="mainContent-area">
        <h2>
          THE FOLLOWING RESTRICTIONS APPLY IN{" "}
          <span style={{ color: "#ff073a" }}>{selectedStateUpper}</span>
        </h2>
        <div id="box">
          <div className="colorText">
            <h4>RESTRICTIONS ON TRAVELERS: </h4>
          </div>
          <h5>{airlineEntry}</h5>
        </div>
        <div id="box">
          <div className="colorText">
            <h4>BORDER RESTRICTIONS: </h4>
          </div>
          <h5>{border}</h5>
        </div>
        <div id="box">
          <div className="colorText">
            <h4>CURFEW: </h4>
          </div>
          <h5>{curfew}</h5>
        </div>
        <div id="box">
          <div className="colorText">
            <h4>MASK MANDATES: </h4>
          </div>
          <h5>{mask}</h5>
        </div>
        <div id="box">
          <div className="colorText">
            <h4>ARE NON ESSENTIAL STORES OPEN? </h4>
          </div>
          <h5>{stores}</h5>
        </div>
        <div id="box">
          <div className="colorText">
            <h4>ARE RESTAURANTS OPEN FOR DINE-IN OR TAKE OUT? </h4>
          </div>
          <h5>{restaurants}</h5>
        </div>
      </div>
      <Link
        style={{ textDecoration: "none" }}
        to={{
          pathname: "/EditRestriction",
          state: { travelerRestrictions: travelerRestrictions },
        }}
      >
        <button className="edit-btn">Edit Restrictions</button>
      </Link>
      {/*This section is just for the arrow to previous and next pages*/}
      <div className="right-arrow-icon">
        <Link
          to="/test-site-location"
          style={{ textDecoration: "none", color: "black" }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      </div>
    </div>
  );
};

export default Thirdpage;
