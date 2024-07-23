import React, { useState, useEffect } from "react";
import Hamburger from "../../../assets/menu.png";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import User from "../../../assets/user.png";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  useEffect(() => {
    if (sessionStorage.getItem("locationAdded") === "true") {
      setShowPopup(true);
      sessionStorage.removeItem("locationAdded");
    }
  }, []);

  return (
    <>
      <div className="listing-page-cont">
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
            <button>Logout</button>
          </div>
        </nav>
        <div className="card-cont"></div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Location has been added successfully!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
