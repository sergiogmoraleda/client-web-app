import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import "../styles/Header.css";

const Header = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    navigate("/");
  };

  return (
    <div>
      <nav className="navMenu">
        <Link to="/home">Home</Link>
        <Link to="/cuenta">User</Link>
        {authToken ? (
          <Link
            to="/home"
            onClick={handleLogout}
          >
            Logout
          </Link>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            Login
          </Link>
        )}
        <div className="dot"></div>
      </nav>
    </div>
  );
};

export default Header;
