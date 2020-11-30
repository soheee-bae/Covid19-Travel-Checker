import React from "react";
import { FaAutoprefixer } from "react-icons/fa";
import "../styles/EducationZone.css";

const EducationZone = () => {
  return (
    //This is the EducationZone page.
    //Use the 'styles/EducationZone.css' to style this page.
    <div className="EducationZone">
    <div className="mainContent-area">
    <div id="boxTitle"><h1>Education Zone</h1></div>
    <div id="boxText">
    <h4>Welcome to the Education Zone! On this page you can learn the basics of COVID-19 safety.</h4>
    <br></br>
    <h4>If you're interested in learning more, check out the educational game created by one of our teammates below:</h4>
    </div><div id="box">
    <iframe frameborder="0" src="https://itch.io/embed/735352" width="515" height="175">
    <a href="https://ambrosio.itch.io/four-stories-covid">four stories : COVID by Ambrosio</a>
    </iframe>
    </div>
    </div>
    </div>
  );
};

export default EducationZone;
