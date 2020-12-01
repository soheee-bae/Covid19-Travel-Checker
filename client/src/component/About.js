import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    //This is the About page.
    //Use the 'styles/About.css' to style this page.
    <div className="About">
    <div className="mainContent-area">
    <h1>About Us</h1>
    <div id="boxText">
    <h4>This is a project created by a team called the Fire Ferrets. We are three undergraduate students attending UAA, who started this project in a software engineering course.</h4>
    <br></br>
    <h4>The Fire Ferrets are: </h4>
    </div>
    <div id="box">
    <h4>So Hee Bae</h4> 
    A student attending UAA
    <br></br> 
    </div>
    <div id="box">
    <h4>Branden Gookin</h4> 
    A student attending UAA
    </div>
    <div id="box">
    <h4>Milo Stickle-Frizzell</h4> 
    A student attending UAA
    </div>
    
    </div></div>
  );
};

export default About;
