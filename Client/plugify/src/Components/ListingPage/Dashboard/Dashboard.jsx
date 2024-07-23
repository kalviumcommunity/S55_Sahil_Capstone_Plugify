import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "../../../assets/menu.png";
import "./Dashboard.css";
import User from "../../../assets/user.png";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("locationAdded") === "true") {
      setShowPopup(true);
      localStorage.removeItem("locationAdded");
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
  }, []);

  return (
    <>
      <div className="listing-page-cont">
        {showPopup && (
          <div className="suc-message">
            <p>Location has been added successfully!</p>
          </div>
        )}
        <nav className="side-navbar">
          <div className="dash-head">
            <img className="user-image" src={User} alt="Users image" />
            <h2 className="username">{sessionStorage.getItem("username")}</h2>
          </div>
          <Link to="/dashboard" className="dashboard-text">
            <div className="dashboard">Dashboard</div>
          </Link>
          <Link to="/addentity" className="listdata-text">
            <div className="dashboard">List Data</div>
          </Link>
          <Link to="/profile" className="listdata-text">
            <div className="dashboard">Profile</div>
          </Link>
          <div>
            <button className="logout" onClick={handleLogout}>Logout</button>
          </div>
        </nav>
        <div className="card-cont"></div>
      </div>
    </>
  );
};

export default Navbar;
