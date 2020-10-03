import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.css";

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <div className="Login-container">
        <div className="LoginTitle">
          <h5>LOG IN</h5>
        </div>
        <form className="LoginInput-Section">
          <input
            className="login-input"
            type="text"
            autoFocus
            required
            placeholder="Username"
          />
          <input
            className="login-input"
            type="password"
            autoFocus
            required
            placeholder="Password"
          />
          <button type="submit" className="Loginbtn">
            Get Started <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </form>

        <div className="additionInfo">
          <div className="forgot-password">
            <Link to="/forgotpassword" style={{ textDecoration: "none" }}>
              <p className="forgotpass"> Forgot Password?</p>
            </Link>
          </div>
          <div className="btn-to-Signup">
            Don't Have an account?
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <span className="direct-to-signup"> Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
