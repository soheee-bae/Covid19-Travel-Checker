import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../../src/styles/Navbar.css";
import { IconContext } from "react-icons";
import logo from "../img/logo.png";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
        <ul className="navbar-ul">
          <Link to="/login" style={{ textDecoration: "none" }}>
            <ol className="nav-list">LOGIN</ol>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
