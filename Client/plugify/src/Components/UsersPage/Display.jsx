import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Display.css";

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [pincode, setPincode] = useState("");

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
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    if (pincode) {
      const filtered = data.filter(
        (item) => item.pin_code === parseInt(pincode, 10)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
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
        <form onSubmit={handlePincodeSubmit} className="pincode-form">
          <div className="pincode-sec">
            <label className="pincode">Enter Pincode:</label>
            <input
              type="number"
              id="pincode"
              value={pincode}
              onChange={handlePincodeChange}
              className="pincode-input"
            />
          </div>

          <button type="submit" className="pincode-button">
            Filter
          </button>
        </form>
        <div className="container-cardss flexx">
          {filteredData.length === 0 ? (
            <div className="no-cards-message">
              <p>No charging stations found for this Pincode.</p>
            </div>
          ) : (
            filteredData.map((player) => (
              <div className="card" key={player._id}>
                <div className="card-image">
                  <img src={player.img_url} alt={player.name} />
                </div>
                <div className="card-text">
                  <div className="details">
                    <div className="name">
                      <h3>Charge Type: {player.charge_type}</h3>
                      <h4>Contact: +91 {player.contact_no}</h4>
                    </div>
                    <div className="age">
                      <h3>Pincode: {player.pin_code}</h3>
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
