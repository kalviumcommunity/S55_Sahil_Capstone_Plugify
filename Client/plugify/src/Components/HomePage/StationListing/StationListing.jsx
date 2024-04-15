import React from "react";
import './StationListing.css'
import Car1 from '../../../assets/car-1.png'
import Car2 from '../../../assets/car-2.png'
import Car3 from '../../../assets/car-3.png'
import Step1 from '../../../assets/copy.png'
import Step2 from '../../../assets/pin.png'
import Step3 from '../../../assets/stopwatch.png'
import { Link } from "react-router-dom";

function Contact() {

  return (
    <>
        <div className="station-container">
            <div className="list-location-cont flex">
                <h1 className="list-your-loc">List Your Location</h1>
                <h5 className="location-desc grey">With Plugify', EV owners can easily list their charging stations and contribute to the growing network of accessible charging options. Charging is fast, convenient, and available anywhere with electricity.</h5>
            </div>
            <div className="list-btn-cont">
                <Link to="/signup" className="list-btn">Register</Link>
            </div>
            <div className="photos-cont">
                <div className="photo-1-cont width">
                    <img className="photo-cont-img" src={Car1} alt="car under a shelter at night" />
                    <h2 className="photo-head">While you sleep</h2>
                    <h4 className="photo-desc grey">Make use of your home charging stations</h4>
                </div>
                <div className="photo-2-cont width">
                    <img className="photo-cont-img" src={Car2} alt="A blue car charging at a station" />
                    <h2 className="photo-head">Road Trips</h2>
                    <h4 className="photo-desc grey">Help others to charge at your own home station</h4>  
                </div>
                <div className="photo-3-cont width">
                    <img className="photo-cont-img" src={Car3} alt="A white car charging at a station" />
                    <h2 className="photo-head">Income</h2>
                    <h4 className="photo-desc grey">Charge customers for using your home station per hour</h4>  
                </div>
            </div>
            <div className="how-it-works-cont">
                <div className="how-it-works">
                    <h1>HOW IT WORKS</h1>
                    <h5>Add your home on the map</h5>
                </div>
                <div className="steps">
                    <div className="step-1 steps-width">
                        <img className="steps-icon" src={Step1} alt="photo collage icon" />
                        <h2 className="step-head">Add Photos</h2>
                        <h4 className="step-desc grey">Photos of your charging station</h4>
                    </div>
                    <div className="step-2 steps-width">
                        <img className="steps-icon" src={Step2} alt="pinned location icon" />
                        <h2 className="step-head">Add Location</h2>
                        <h4 className="step-desc grey">A google maps link of your charging station</h4>
                    </div>
                    <div className="step-3 steps-width">
                        <img className="steps-icon" src={Step3} alt="timer icon" />
                        <h2 className="step-head">Fast</h2>
                        <h4 className="step-desc grey">Easy and convenient to add your charging station</h4>
                    </div>

                </div>
            </div>


        </div>


    </>
  );
}

export default Contact;
