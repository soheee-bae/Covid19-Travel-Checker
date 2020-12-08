import React, { useContext, useState, useEffect } from "react";
import { stateContext } from "../App";
import axios from "axios";
import "../styles/EditRestriction.css";
import { covidContext } from "../App";
import jwt_decode from "jwt-decode";

const EditRestriction = (props) => {
  const { selectedState, setSelectedState } = useContext(stateContext);
  const { webtoken } = useContext(covidContext);
  const [webToken, setWebToken] = webtoken;
  const [travelerRestrictions, setTravelerRestrictions] = useState({
    jwt: "",
    username: "",
    selectedState: "",
    airlineEntry: "",
    border: "",
    curfew: "",
    mask: "",
    stores: "",
    restaurants: "",
  });

  const sendEmail = async () => {
    const mail = await axios.post(
      "http://localhost:3500/mail",
      travelerRestrictions,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    if (mail.status === 200) {
      alert("Email sent Successfully!");
    } else {
      alert(mail.data);
    }
  };

  useEffect(() => {
    let travel = props.location.state.travelerRestrictions;
    var decoded = jwt_decode(webToken.jwt);
    setTravelerRestrictions({
      username: decoded.username,
      jwt: webToken.jwt,
      selectedState: selectedState,
      airlineEntry: travel.TravelerRestrictions,
      border: travel.BorderClosure,
      curfew: travel.Curfew,
      mask: travel.MaskRequirement,
      stores: travel.NonEssentialStoresOpen,
      restaurants: travel.RestaurantsOpen,
    });
  }, []);

  const handleEditBtn = async (e) => {
    e.preventDefault();
    const data = await axios.post(
      `http://localhost:3500/stateset`,
      travelerRestrictions,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    if (data.status === 200) {
      sendEmail();
      props.history.push({
        pathname: "/restrictions-on-travelers",
      });
    } else {
      console.log(data.data);
    }
  };

  return (
    <div className="EditRestriction">
      <div className="editRestriction-main">
        <div className="editRestriction-item">
          <p>Restrictions on Travelers : </p>
          <textarea
            className="input"
            type="text"
            autoFocus
            required
            value={travelerRestrictions.airlineEntry}
            onChange={(e) => {
              setTravelerRestrictions({
                ...travelerRestrictions,
                airlineEntry: e.target.value,
              });
            }}
          />
        </div>
        <div className="editRestriction-item">
          <p>Border Restrictions : </p>
          <textarea
            className="input"
            type="text"
            autoFocus
            required
            value={travelerRestrictions.border}
            onChange={(e) => {
              setTravelerRestrictions({
                ...travelerRestrictions,
                border: e.target.value,
              });
            }}
          />
        </div>
        <div className="editRestriction-item">
          <p>Curfew : </p>
          <textarea
            className="input"
            type="text"
            autoFocus
            required
            value={travelerRestrictions.curfew}
            onChange={(e) => {
              setTravelerRestrictions({
                ...travelerRestrictions,
                curfew: e.target.value,
              });
            }}
          />
        </div>
        <div className="editRestriction-item">
          <p>Mask Mandates : </p>
          <textarea
            className="input"
            type="text"
            autoFocus
            required
            value={travelerRestrictions.mask}
            onChange={(e) => {
              setTravelerRestrictions({
                ...travelerRestrictions,
                mask: e.target.value,
              });
            }}
          />
        </div>
        <div className="editRestriction-item">
          <p>Are non essential stores open? : </p>
          <textarea
            className="input"
            type="text"
            autoFocus
            required
            value={travelerRestrictions.stores}
            onChange={(e) => {
              setTravelerRestrictions({
                ...travelerRestrictions,
                stores: e.target.value,
              });
            }}
          />
        </div>
        <div className="editRestriction-item">
          <p>Are restaurants open? : </p>
          <textarea
            className="input"
            type="text"
            autoFocus
            required
            value={travelerRestrictions.restaurants}
            onChange={(e) => {
              setTravelerRestrictions({
                ...travelerRestrictions,
                restaurants: e.target.value,
              });
            }}
          />
        </div>

        <button className="edit-btn" onClick={handleEditBtn}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditRestriction;
