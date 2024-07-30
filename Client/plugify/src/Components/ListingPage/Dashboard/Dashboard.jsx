import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Hamburger from "../../../assets/menu.png";
import User from "../../../assets/user.png";
import "./Dashboard.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://plugify.onrender.com/data");
        const username = sessionStorage.getItem("username");
        const filteredData = response.data.filter(
          (item) => item.created_by === username
        );
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://plugify.onrender.com/delete/${id}`);
      const response = await axios.get("https://plugify.onrender.com/data");
      const username = sessionStorage.getItem("username");
      const filteredData = response.data.filter(
        (item) => item.created_by === username
      );
      setData(filteredData);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <div className="listing-page-cont">
        {showPopup && (
          <div className="suc-message">
            <p>Location has been added successfully!</p>
          </div>
        )}
        <div className="navbar-container">
          <div className="hamburger" onClick={handleShowNavbar}>
            <img src={Hamburger} alt="menu" />
          </div>
          <nav className={`side-navbar ${showNavbar && "active"}`}>
            <div className="dash-head">
              <img className="user-image" src={User} alt="User" />
              <h2 className="username">{sessionStorage.getItem("username")}</h2>
            </div>
            <Link
              to="/dashboard"
              className="dashboard-text"
              onClick={handleShowNavbar}
            >
              <div className="dashboard">Dashboard</div>
            </Link>
            <Link
              to="/addentity"
              className="listdata-text"
              onClick={handleShowNavbar}
            >
              <div className="dashboard">List Data</div>
            </Link>
            <Link
              to="/profile"
              className="listdata-text"
              onClick={handleShowNavbar}
            >
              <div className="dashboard">Profile</div>
            </Link>
            <div>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </nav>
        </div>
        <div className="container-cards flex">
          {data.length === 0 ? (
            <div className="no-cards-message">
              <p>No charging stations added. Please add by clicking on List Data.</p>
            </div>
          ) : (
            data.map((player) => (
              <div className="card" key={player._id}>
                <div className="card-image">
                  <img src={player.img_url} alt={player.name} />
                </div>
                <div className="card-text">
                  <div className="details">
                    <div className="name">
                      <h3>Charge Type: {player.charge_type}</h3>
                      <h4>Contact: {player.contact_no}</h4>
                    </div>
                    <div className="age">
                      <h5 className="height">
                        <a
                          href={player.google_maps_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="map-button">
                            Open in Google Maps
                          </button>
                        </a>
                      </h5>
                    </div>
                  </div>
                  <br />
                  <div>
                    <h3>Price: {player.price_per_min} Rs/min</h3>
                  </div>
                  <div className="actions">
                    <div>
                      <Link to={`/update/${player._id}`}>
                        <button className="update">Update</button>
                      </Link>
                    </div>
                    <div>
                      <button
                        className="delete"
                        onClick={() => handleDelete(player._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
