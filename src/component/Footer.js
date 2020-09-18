import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <nav className="Footer">
      <ul className="footer-ul">
        <Link to="/" style={{ textDecoration: "none" }}>
          <ol className="foot-list">HOME</ol>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <ol className="foot-list">ABOUT</ol>
        </Link>
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <ol className="foot-list">CONTACT</ol>
        </Link>
        <Link to="/educationZone" style={{ textDecoration: "none" }}>
          <ol className="foot-list">EDUCATION ZONE</ol>
        </Link>
      </ul>
      <p className="copy-right">©Copyright. All rights reserved.</p>
    </nav>
  );
};

export default Footer;
