import React from "react";
import "./NearbyStations.css";
import NearbyImg from "../../../assets/nearby.png";
import Calendar from "../../../assets/calendar.png";
import Connections from "../../../assets/connections.png";
import ElectricCar from "../../../assets/electric-car.png";
import { Link } from "react-router-dom";

function NearbyStations() {
  return (
    <>
      <div className="nearby-cont">
        <div className="nearby-photo">
          <img
            className="nearby-img"
            src={NearbyImg}
            alt="Inside of a car, showing the maps on the screen"
          />
        </div>
        <div className="nearby-right-panel">
          <div className="nearby-head">
            <h1 className="nearby-tagline">Explore Nearby Charging Stations</h1>
            <h5 className="nearby-desc">
              With Plugify', discover a network of nearby charging stations
              listed by the EV charging station owners. Easily find convenient
              charging options to keep your electric vehicle powered up on the
              go.
            </h5>
          </div>
          <div className="nearby-grid">
            <div className="grid-item">
              <img className="grid-icon" src={Calendar} alt="Calendar icon" />
              <h5><b>Plan</b> beforehand</h5>
            </div>
            <div className="grid-item">
              <img
                className="grid-icon"
                src={Connections}
                alt="Connectivty/network icon"
              />
              <h5><b>Seamless</b> Connectivity</h5>
            </div>
            <div className="grid-item">
              <img
                className="grid-icon"
                src={ElectricCar}
                alt="Electric-car icon"
              />
              <h5><b>Convenient</b> trip</h5>
            </div>
            <div className="grid-item">
              <img className="grid-icon" src={ElectricCar} alt="" />
            </div>
          </div>
          <div className="nearby-btn-cont">
            <Link to="/signupuser" className="nearby-btn">
              See the nearest station
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NearbyStations;
