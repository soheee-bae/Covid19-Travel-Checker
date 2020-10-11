import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/Signup.css";
import axios from "axios";

const SignupPage = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("http://localhost:3500/register", userInfo, {
      withCredentials: true,
      validateStatus: () => true,
    });
    if (data.status === 200) {
      setRedirect(true);
      console.log(data);
    } else {
      alert(data.data);
    }
  };

  if (redirect === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="SignupPage">
      <div className="Signup-container">
        <div className="SignupTitle">
          <h5>SIGN UP</h5>
        </div>
        <form onSubmit={HandleSubmit} className="SignupInput-Section">
          <input
            className="Signup-input"
            type="text"
            autoFocus
            required
            placeholder="Username"
            onChange={(e) => {
              setUserInfo({ ...userInfo, username: e.target.value });
            }}
          />

          <input
            className="Signup-input"
            type="password"
            autoFocus
            required
            placeholder="Password"
            onChange={(e) => {
              setUserInfo({ ...userInfo, password: e.target.value });
            }}
          />

          <button type="submit" className="Signupbtn">
            Create Account <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </form>
        <div className="additionInfo">
          <div className="btn-to-Login">
            Already have account?
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span className="direct-to-Login"> Log In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
