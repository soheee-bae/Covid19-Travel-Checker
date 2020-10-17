import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, Redirect } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../../src/styles/Navbar.css";
import { IconContext } from "react-icons";
import logo from "../img/logo.png";

  const Navbar = (props) => {
    const {
      Logged,
      setLogged,
      setWebtoken,
      dataInfo,
      setDatainfo,
    } = props;
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  
  const handleSignout=()=>{
    setLogged(false);
    setWebtoken("");
    setDatainfo("");
  }

  return (
    <>
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
        {Logged ? (  
        <div className="dropdown">
            <p className="nav-dropdown">username</p>
            <div className="nav-dropdown-list">
              <Link
                to="/reUsd/SellingHistory"
                style={{ textDecoration: "none" }}
              >
                <ol className="nav-dropdown-item">PROFILE</ol>
              </Link>
              <button className="username-button" onClick={handleSignout}>

                <ol className="nav-dropdown-item">SIGN OUT</ol>
              </button>
            </div>
          </div>
        ) :(
        <ul className="navbar-ul">
        <Link to="/login" style={{ textDecoration: "none" }}>
          <ol className="nav-list">LOGIN</ol>
        </Link>
      </ul>)}
      </div>
    </>
  );
}

export default Navbar;
