import React from "react";
import Logo from "../../images/logo.png";
import "../../style/Header.css";
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = () => {
  return (
    <div className="Header">
      <Link to="/">
        <img src={Logo} alt="logo" className="Header-logo" />{" "}
        <a href="/">
          <h4 className="Header-text">GAMZU</h4>
        </a>
      </Link>

      <Search />
    </div>
  );
};

export default Header;
