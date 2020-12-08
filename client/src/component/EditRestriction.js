import React, { useContext, useState, useEffect } from "react";
import { stateContext } from "../App";
import axios from "axios";

const EditRestriction = (props) => {
  const { selectedState, setSelectedState } = useContext(stateContext);
  const [travelerRestrictions, setTravelerRestrictions] = useState({
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
    setTravelerRestrictions({
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
    const data = await axios.put(
      `http://localhost:3500/stateset`,
      travelerRestrictions,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    if (data.status === 200) {
      sendEmail();
    } else {
      console.log(data.data);
    }
  };

  return (
    <div className="EditRestriction">
      <input
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
      <input
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
      <input
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
      <input
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
      <input
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
      <input
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
      <button onClick={handleEditBtn}>Submit</button>
    </div>
  );
};

export default EditRestriction;
