import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo"></img>
      </div>
      <ul className="navbar-ul">
        <Link to="/forum" style={{ textDecoration: "none" }}>
          <ol className="nav-list">FORUM</ol>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <ol className="nav-list">LOGIN</ol>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
