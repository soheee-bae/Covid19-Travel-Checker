import React from "react";
import { FaAutoprefixer } from "react-icons/fa";
import "../styles/EducationZone.css";

const EducationZone = () => {
  return (
    //This is the EducationZone page.
    //Use the 'styles/EducationZone.css' to style this page.
    <div className="EducationZone">
    <div className="mainContent-area">
    <h1>Education Zone</h1>
    <div id="boxText">
    <h4>Welcome to the Education Zone! On this page you can learn the basics of COVID-19 safety. The following information is pulled directly from the <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">Centers for Disease Control and Prevention</a>.</h4>
    </div>
    <div id="box">
    <h2>MASKS</h2>
    <br></br>
    <div className="left">
    <h4>DO THIS:</h4>
    <br></br>
    <ul>
    <li>Wear masks to help protect yourself from getting or spreading COVID-19</li>
    <li>Wear masks with two or more layers to stop the spread of COVID-19</li>
    <li>Wear the mask over your nose and mouth and secure it under your chin</li>
    </ul>
    <br></br>
    <br></br>
    <h4>NOT THIS:</h4>
    <br></br>
    <ul>
    <li>Put masks on someone two years and younger</li>
    <li>Put masks on people who have trouble breathing, or people who cannot remove the mask without assistance</li>
    <li>Wear masks intended for healthcare workers, for example, N95 respirators</li>
    </ul>
    </div>
    </div>
    <div id="box">
    <h2>SOCIAL DISTANCING</h2>
    <br></br>
    <div className="left">
    <h4>Put 6 feet of distance between yourself and people who don’t live in your household:</h4>
    <br></br>
    <ul>
    <li>Remember that some people without symptoms may be able to spread virus</li>
    <li>Stay at least 6 feet (about 2 arms’ length) from other people</li>
    <li>Keeping distance from others is especially important for people who are at higher risk of getting very sick</li>
    </ul>
    </div>
    </div>
    <div id="box">
    <h2>HAND WASHING</h2>
    <br></br>
    <div className="left">
    <h4>Wash your hands often with soap and water for at least 20 seconds especially after you have been in a public place, or after blowing your nose, coughing, or sneezing</h4>
    <br></br>
    <h4>It’s especially important to wash:</h4>
    <br></br>
    <ul>
    <li>Before eating or preparing food</li>
    <li>Before touching your face</li>
    <li>After using the restroom</li>
    <li>After leaving a public place</li>
    <li>After blowing your nose, coughing, or sneezing</li>
    <li>After handling your mask</li>
    <li>After changing a diaper</li>
    <li>After caring for someone sick</li>
    <li>After touching animals or pets</li>
    </ul>
    <br></br>
    <h4>If soap and water are not readily available, use a hand sanitizer that contains at least 60% alcohol. Cover all surfaces of your hands and rub them together until they feel dry.</h4>
    <br></br>
    </div>
    </div>
    <div id="box">
    <h4>If you're interested in learning more, check out this educational game created by one of our teammates below:</h4>
    </div>
    <div id="center">
    <iframe frameborder="0" src="https://itch.io/embed/735352" width="515" height="175">
    <a href="https://ambrosio.itch.io/four-stories-covid">four stories : COVID by Ambrosio</a>
    </iframe>
    </div>

    </div>
    </div>
  );
};

export default EducationZone;
