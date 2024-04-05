import { useState } from "react";
import Hamburger from "../../../assets/menu.png";
import logo from "../../../assets/logo.png";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="hamburger" onClick={handleShowNavbar}>
          <img src={Hamburger} alt="hamburger" />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <div>Home</div>
            </li>
            <li>
              <div>Explore</div>
            </li>
            <li>
              <div>About</div>
            </li>
            <NavLink to="/contact" className='nav-contact'>
              <div >Contact</div>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
