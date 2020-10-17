import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.css";
import axios from "axios";

const LoginPage = (props) => {
  const {
    setWebtoken,
    setLogged,
    setDatainfo,
  } = props;
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("http://localhost:3500/login", userInfo, {
      withCredentials: true,
      validateStatus: () => true,
    });
    if (data.status === 200) {
      setRedirect(true);
      setWebtoken(data.data);
      setLogged(true);
      setDatainfo(data.config.data);
    } else { 
      setRedirect(false);
      setWebtoken("");
      setLogged(false);      
      setDatainfo({});
      alert(data.data);
    }
  };

  if (redirect === true) {
    return <Redirect to="/" />;
  }
  return (
    <div className="LoginPage">
      <div className="Login-container">
        <div className="LoginTitle">
          <h5>LOG IN</h5>
        </div>
        <form onSubmit={HandleSubmit} className="LoginInput-Section">
          <input
            className="login-input"
            type="text"
            autoFocus
            required
            placeholder="Username"
            onChange={(e) => {
              setUserInfo({ ...userInfo, username: e.target.value });
            }}
          />
          <input
            className="login-input"
            type="password"
            autoFocus
            required
            placeholder="Password"
            onChange={(e) => {
              setUserInfo({ ...userInfo, password: e.target.value });
            }}
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
