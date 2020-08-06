import React from "react";
import Logo from "../../images/logo2.png";
import "../../style/Header.css";
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = () => {
  return (
    <div className="Header">
      <Link to="/">
        <img src={Logo} alt="logo" className="Header-logo" />
      </Link>

      <Search />
    </div>
  );
};

export default Header;
