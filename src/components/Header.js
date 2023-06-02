import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import "../styles/Header.css";

const Header = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
  };

  return (
    <div className="headerContainer">
      <nav className="navMenu">
        <NavLink to="/home" activeClassName="activeLink">Home</NavLink>
        <NavLink to="/topusers" activeClassName="activeLink">Top {}</NavLink>
        <NavLink to="/search" activeClassName="activeLink">Search</NavLink>

        {authToken ? (
          <Link to="/" onClick={handleLogout} className="ml1">
            Exit
          </Link>
        ) : (
          <NavLink to="/login" activeClassName="activeLink" className="ml1 no-underline black">
            Login
          </NavLink>
        )}
        <div className="dot"></div>
      </nav>
    </div>
  );
};

export default Header;
