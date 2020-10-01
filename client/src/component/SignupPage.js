import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/Signup.css";

const SignupPage = () => {
  return (
    <div className="SignupPage">
      <div className="Signup-container">
        <div className="SignupTitleSection">
          <div className="SignupTitle">
            <h5>SIGN UP TO CONTINUE</h5>
          </div>
          <img className="Signuplogo" src={logo} alt="logo" />
        </div>
        <form className="SignupInputSection">
          <input
            className="Signup-input"
            type="text"
            autoFocus
            required
            placeholder="Username"
          />

          <input
            className="Signup-input"
            type="password"
            autoFocus
            required
            placeholder="Password"
          />

          <button type="submit" className="Signupbtn">
            Get Started <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </form>
        <div className="additionInfo">
          <div className="btn-to-Signup">
            Already have account?
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span className="direct-to-Loginin"> Log In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
