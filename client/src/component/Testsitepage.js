import React, { useContext, useState, useEffect } from "react";
import "../styles/Testsitepage.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Testsite from "../testsite/Testsite.json";
import Select from "react-select";
import { stateContext } from "../App";

const Testsitepage = () => {
  const { selectedState, setSelectedState } = useContext(stateContext);
  const [testsite, setTestsite] = useState({});
  const [Counties, setCounties] = useState([]);
  var CountiesList = [];

  useEffect(() => {
    Testsite.map((testsite) => {
      if ((testsite.State = selectedState)) {
        setTestsite(testsite);
        setCounties(testsite.Counties);
      }
    });
  }, []);

  const SearchbarStyle = {
    control: (base, state) => ({
      ...base,
      fontSize: 14,
      border: state.isFocused ? 0 : 0,
      cursor: "text",
      borderRadius: 5,
      width: "40vw",
      minWidth: "300px",
      height: "3rem",
      padding: "0 1rem",
      boxShadow: "0 10px 35px rgba(0,0,0,.2)",
      color: "#6c757d",
      outline: "none",
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        cursor: "pointer",
        backgroundColor: isFocused ? "white" : "white",
        color: isFocused ? "rgba(255, 80, 86)" : "black",
        lineHeight: 2,
        fontSize: 14,
        width: "40vw",
        height: "3rem",
        minWidth: "300px",
        zIndex: "0",
      };
    },

    input: (styles) => ({
      ...styles,
      color: "black",
      width: "40vw",
      fontSize: 14,
      minWidth: "300px",
      zIndex: "0",
    }),

    menu: (styles) => ({
      ...styles,
      boxShadow: "none",
      borderRadius: 0,
      borderTop: "solid 1px",
      width: "40vw",
      height: "3rem",
      minWidth: "300px",
      zIndex: "0",
    }),

    singleValue: (styles) => ({
      ...styles,
      color: "rgba(255, 80, 86)",
      width: "40vw",
      minWidth: "300px",
      zIndex: "0",
    }),
  };

  const searchList = Counties.forEach((county) => {
    CountiesList.push({ label: county, value: county });
  });

  return (
    <div className="Testsitepage">
      <div className="Testsite-leftarrow">
        <Link
          to="/state-travel-restrictions"
          style={{ textDecoration: "none" }}
        >
          <FontAwesomeIcon
            style={{ fontSize: "30px", color: "black" }}
            icon={faAngleLeft}
          />
        </Link>
      </div>
      <div className="Testsitepage-mainarea">
        <div className="search-bar-for-counties">
          <Select
            options={CountiesList}
            placeholder="Search the Counties"
            openMenuOnClick={false}
            className="counties-search-bar"
            styles={SearchbarStyle}
          />
        </div>
        <div className="output-for-testing-site"></div>
      </div>
      <div className="right-arrow-icon">
        <p></p>
      </div>
    </div>
  );
};

export default Testsitepage;
