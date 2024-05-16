import { useState } from "react";
import Hamburger from "../../../assets/menu.png";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import User from "../../../assets/user.png";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <>
      <div className="listing-page-cont">
        <nav className="side-navbar">
          <div>
            <img className="user-image" src={User} alt="Users image" />
            <h2>{sessionStorage.getItem("username")}</h2>
          </div>
          <div className="dashboard"><Link to='/dashboard' className="dashboard-text">Dashboard</Link></div>
          <div className="listdata"><Link to='/listdata' className="listdata-text">List Data</Link></div>
          <div>
            <button>Logout</button>
          </div>
        </nav>
        <div className="card-cont"></div>
      </div>
    </>
  );
};

export default Navbar;
