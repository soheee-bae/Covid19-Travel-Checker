import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    //This is the Contact page.
    //Use the 'styles/Contact.css' to style this page.
    <div className="Contact">
      <div className="mainContent-area">
        <h1>Contact Information</h1>
        <div id="box">
          <h4>Do you have questions or bugs found relating to this website?</h4>
          <br></br>
          <h4>Or are you curious about this project?</h4>
          <br></br>
          <h4>You can reach us via the information below: </h4>
          <br></br>
        </div>
        <div id="box">
          <a href="url">
            <h3>fireferrets@gmail.com</h3>
          </a>
          <h3>(999) 999-9999</h3>
          <h3>520 West Fire Ferret Avenue, Anchorage AK, 99503</h3>
        </div>
      </div>
    </div>
  );
};

export default Contact;
