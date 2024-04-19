import React from "react";
import './Footer.css'
import FooterImg from "../../../assets/bg5.png";

function Footer() {
  return (
    <>

      <div className="footer-cont">
        <img className="footer-img" src={FooterImg} alt="" />
      </div>
      <h1 className="head">Go Anywhere</h1>
    </>
  );
}

export default Footer;
