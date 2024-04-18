import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGoogle,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignInSignUpForm = () => {
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm();
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const onSubmitSignUp = async (data) => {
    console.log(data);
    {
      const { username, password, email } = data;
      try {  
        const response = await axios.post(`https://plugify.onrender.com/adminsignup`, { username, password, email });
        if (response.status === 200) {
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      }
    };
  };

  const onSubmitSignIn = async (data) => {
    const { username, password } = data;
    try {
      const response = await axios.post(`https://plugify.onrender.com/adminlogin`, { username, password });
      if (response.status === 200) {
        console.log(username)
        navigate("/");
      } else {
        setLoginMessage('Invalid Credentials');
      }
    } catch (err) {
      console.error(err);
      setLoginMessage('Invalid Credentials');
    }
  };

  return (
    <div className={`signup-container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form
            onSubmit={handleLoginSubmit(onSubmitSignIn)}
            className={`sign-in-form ${isSignUpMode ? "hidden" : ""}`}
          >
            <h2 className="title-signup">Login</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="fas fa-user" />
              <input
                type="text"
                placeholder="Username"
                {...loginRegister("username", { required: true })}
              />
            </div>
            {loginErrors.username && (
              <p className="error-message">Username is required</p>
            )}
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="fas fa-lock" />
              <input
                type="password"
                placeholder="Password"
                {...loginRegister("password", {
                  required: true,
                })}
              />
            </div>
            {loginErrors.password && (
              <p className="error-message">{loginErrors.password.message}</p>
            )}
            <input type="submit" value="Login" className="signup-btn solid" />
            <p className="social-text">Or Login with social platforms</p>
            <div className="social-icons flex-centre">
              <a
                href="https://www.instagram.com/sahil_k17/"
                className="facebook bg-color"
              >
                <FontAwesomeIcon icon={faFacebookF} className="icon" />
              </a>
              <a
                href="https://www.instagram.com/sahil_k17/"
                className="twitter bg-color"
              >
                <FontAwesomeIcon icon={faXTwitter} className="icon " />
              </a>
              <a
                href="https://www.instagram.com/sahil_k17/"
                className="google bg-color"
              >
                <FontAwesomeIcon icon={faGoogle} className="icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/sahil-kharatmol-229912273/"
                className="linkedin bg-color"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="icon" />
              </a>
            </div>
          </form>
          <form
            onSubmit={handleSignupSubmit(onSubmitSignUp)}
            className={`sign-up-form ${isSignUpMode ? "" : "hidden"}`}
          >
            <h2 className="title-signup">Sign up</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="fas fa-user" />
              <input
                type="text"
                placeholder="Username"
                {...signupRegister("username", { required: true })}
              />
            </div>
            {signupErrors.username && (
              <p className="error-message">Username is required</p>
            )}
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className="fas fa-envelope" />
              <input
                type="email"
                placeholder="Email"
                {...signupRegister("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {signupErrors.email && (
              <p className="error-message">{signupErrors.email.message}</p>
            )}
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="fas fa-lock" />
              <input
                type="password"
                placeholder="Password"
                {...signupRegister("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password should be more than 5 characters",
                  },
                })}
              />
            </div>
            {signupErrors.password && (
              <p className="error-message">{signupErrors.password.message}</p>
            )}
            <input type="submit" value="Sign up" className="signup-btn" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-icons flex-centre">
              <a
                href="https://www.instagram.com/sahil_k17/"
                className="facebook bg-color"
              >
                <FontAwesomeIcon icon={faFacebookF} className="icon" />
              </a>
              <a
                href="https://www.instagram.com/sahil_k17/"
                className="twitter bg-color"
              >
                <FontAwesomeIcon icon={faXTwitter} className="icon " />
              </a>
              <a
                href="https://www.instagram.com/sahil_k17/"
                className="google bg-color"
              >
                <FontAwesomeIcon icon={faGoogle} className="icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/sahil-kharatmol-229912273/"
                className="linkedin bg-color"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="icon" />
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New to our community ?</h3>
            <p>
              Discover a world of possibilities! Join us and explore a vibrant
              community where ideas flourish and connections thrive.
            </p>
            <button className="abv-btn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img
            src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
            className="image"
            alt=""
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of Our Valued Members</h3>
            <p>
              Thank you for being part of our community. Your presence enriches
              our shared experiences. Let's continue this journey together!
            </p>
            <button className="abv-btn transparent" onClick={handleSignInClick}>
              Login
            </button>
          </div>
          <img
            src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
            className="image"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpForm;