import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    //This is the About page.
    //Use the 'styles/About.css' to style this page.
    <div className="About">
    <div className="mainContent-area">
    <h1>About Us</h1>
    <div id="box">
    <h4>This is a project created by a team called the Fire Ferrets. We are three undergraduate students attending UAA, who started this project in a software engineering course.</h4>
    <br></br>
    <h4>The Fire Ferrets are: </h4>
    </div>
    <div id="box">
    <h4>So Hee Bae</h4> 
    A student majoring in Computer Science at UAA. She spends her days passionately learning new technologies and frameworks and experimenting with HTML, CSS, and Javascript in order to become a web developer.  
    <br></br> 
    </div>
    <div id="box">
    <h4>Branden Gookin</h4> 
    "Am I allowed to pass?"
    </div>
    <div id="box">
    <h4>Milo Stickle-Frizzell</h4> 
    A senior attending UAA majoring in both Art and Computer Science. He spends his free time designing video games, drawing, participating in local activism, and watching one too many movies.
    </div>
    <div className="centerIMG">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/University_of_Alaska_Anchorage_logo.png/799px-University_of_Alaska_Anchorage_logo.png" width="40%" height="50%" alt="W3Schools.com"></img>
    <img src="https://yt3.ggpht.com/ytc/AAUvwngshYI9Q_7VzYQFtoJR60oqU8VDrTiYDDssY3eu=s900-c-k-c0x00ffffff-no-rj" width="20%" height="20%" alt="W3Schools.com"></img>
    </div></div></div>
  );
};

export default About;
