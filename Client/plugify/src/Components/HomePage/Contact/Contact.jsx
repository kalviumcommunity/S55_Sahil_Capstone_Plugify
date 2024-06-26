import React from "react";
import { useForm } from "react-hook-form";
import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="bg"></div>
      <div className="color"></div>
      <div className="form-container">
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let's get in touch</h3>
            <p className="text">
              Contact us today to discuss how our services can meet your needs.
              Our team is dedicated to providing top-notch solutions tailored to
              your requirements.
            </p>

            <div className="info">
              <div className="information">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> &nbsp; &nbsp;
                <p>MIT ADT, Loni Kalbhor, Pune - 412201</p>
              </div>
              <div className="information">
                <FontAwesomeIcon icon={faEnvelope} /> &nbsp; &nbsp;
                <p>plugify.connect@gmail.com</p>
              </div>
              <div className="information">
                <FontAwesomeIcon icon={faPhone} />
                &nbsp; &nbsp;
                <p>7715013770</p>
              </div>
            </div>

            <div className="social-medias">
              <div className="social-icons">
                <a href="https://www.instagram.com/sahil_k17/" className="facebook bg-color">
                  <FontAwesomeIcon icon={faFacebookF} className="icon" />
                </a>
                <a href="https://www.instagram.com/sahil_k17/" className="twitter bg-color">
                  <FontAwesomeIcon icon={faXTwitter} className="icon " />
                </a>
                <a href="https://www.instagram.com/sahil_k17/" className="instagram bg-color">
                  <FontAwesomeIcon icon={faInstagram} className="icon" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sahil-kharatmol-229912273/"
                  className="linkedin bg-color"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} className="icon" />
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit(onSubmit)} className="contacts-form">
              <h3 className="title">Contact us</h3>
              <div className="input-container">
                <label htmlFor="name" className={errors.name ? "active" : ""}>
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  {...register("name", { required: true })}
                />
                {errors.name && <p className="error">Name is required</p>}
              </div>
              <div className="input-container">
                <label htmlFor="email" className={errors.email ? "active" : ""}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>
              <div className="input-container">
                <label htmlFor="phone" className={errors.phone ? "active" : ""}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="input"
                  {...register("phone", {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                  })}
                />
                {errors.phone && errors.phone.type === "required" && (
                  <p className="error">Phone is required</p>
                )}
                {errors.phone && errors.phone.type === "pattern" && (
                  <p className="error">Phone must be 10 digits</p>
                )}
              </div>
              <div className="input-container textarea">
                <label
                  htmlFor="message"
                  className={errors.message ? "active" : ""}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  className="input"
                  {...register("message", { required: true })}
                ></textarea>
                {errors.message && <p className="error">Message is required</p>}
              </div>
              <input type="submit" value="Send" className="btn" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
