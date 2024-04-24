import { useState } from "react";
import Hamburger from "../../../assets/menu.png";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";

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
                <h2>{sessionStorage.getItem('username')}</h2>
            </div>
            <div>asdasd</div>
            <div>asd</div>
            <div></div>
            <div></div>
        </nav>
        <div className="card-cont">

        </div>
      </div>
    </>
  );
};

export default Navbar;
