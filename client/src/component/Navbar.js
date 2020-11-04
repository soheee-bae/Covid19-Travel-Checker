import React, { useState, useEffect, useContext} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, Redirect } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../../src/styles/Navbar.css";
import { IconContext } from "react-icons";
import logo from "../img/logo.png";
import {covidContext} from '../App'

const Navbar = () => {
  const {webtoken} = useContext(covidContext);
  const [webToken, setWebToken] = webtoken;
  const [sidebar, setSidebar] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const handleSignout=()=>{
    window.localStorage.clear('webtoken')
    window.localStorage.clear('dataInfo')
    setWebToken("")
    window.location='/'
  }

  if (redirect === true) {
    return <Redirect to="/" />;
  }



  return (
      <div className="Topnavbar">
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="Sidenavbar">
            <Link to="#" className="menu-bar-menubar">
              <FaIcons.FaBars
                onClick={showSidebar}
                style={{ color: "#7a7d7d" }}
              />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bar-close">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="navbar-list-title">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
        {webToken === "" ? (
        <ul className="navbar-ul">
          <Link to="/login" style={{ textDecoration: "none" }}>
            <ol className="nav-list">LOGIN</ol>
          </Link>
        </ul>
        ) : (
          <ul className="navbar-ul-logged">
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <ol className="nav-list">PROFILE</ol>
          </Link>
          <button className="signout-button" onClick={handleSignout}>
            <ol className="nav-dropdown-item">SIGN OUT</ol>
          </button>
        </ul>
       )}
      </div>
  );
}

export default Navbar;
