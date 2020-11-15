import React, { useContext, useState, useEffect } from "react";
import "../styles/Testsitepage.css";
import Testsite from "../Testsite/Testsite.json";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { stateContext } from "../App";
import axios from "axios";

const Testsitepage = () => {
  const { selectedState, setSelectedState } = useContext(stateContext);
  const [sites, setSites] = useState([]);
  const [tempSites, setTempSites] = useState([]);
  const [Counties, setCounties] = useState([]);
  var CountiesList = [];

  const handleSearchbarSubmit = (search) => {
    console.log(search.value);
    setTempSites(
      sites.filter(
        (data) => data.County.toLowerCase() === search.value.toLowerCase()
      )
    );
  };

  useEffect(() => {
    {
      const fetchdata = async () => {
        const Testsite = await axios.get("http://localhost:3500/testsites", {
          withCredentials: true,
          validateStatus: () => true,
        });

        if (Testsite.status === 200) {
          Testsite.data.map((testsite) => {
            if (testsite.State === selectedState) {
              setSites(testsite.Testsite);
              setTempSites(testsite.Testsite);
              setCounties(testsite.Counties);
            } else {
              return null;
            }
          });
        } else {
          console.log("error!");
        }
      };
      fetchdata();
    }
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
      textAlign: "left",
    }),

    menu: (styles) => ({
      ...styles,
      marginTop: "0",
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
      <div className="testsitepage-title">
        <p>
          TESTING SITE LOCATION OF{" "}
          <span style={{ color: "#ff073a" }}>
            {selectedState.toUpperCase()}
          </span>
        </p>
      </div>
      <div className="testsite-container">
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
              onChange={handleSearchbarSubmit}
            />
          </div>
          <div className="output-for-testing-site">
            <ul className="testingsite-card">
              {tempSites &&
                tempSites.map((site, index) => (
                  <ol className="testingsite-list" key={index}>
                    <div className="testingsite-info">
                      <p className="testingsite-name">{site.Name}</p>
                      <p className="testingsite-address">
                        <span>{site.Address}</span>
                      </p>
                      <p className="testingsite-Phone">
                        Phone :{" "}
                        <span className="testingsite-detail">{site.Phone}</span>
                      </p>
                    </div>
                  </ol>
                ))}
            </ul>
          </div>
        </div>
        <div className="right-arrow-icon">
          <p></p>
        </div>
      </div>
    </div>
  );
};
export default Testsitepage;
