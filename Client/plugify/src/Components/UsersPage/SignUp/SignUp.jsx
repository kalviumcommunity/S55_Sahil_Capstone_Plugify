import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignUpForm = () => {
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
  const [showSignupSuccessMessage, setShowSignupSuccessMessage] =
    useState(false);

  const [googleUserData, setGoogleUserData] = useState({});
  const [showUsername, setShowUsername] = useState(true);
  const [username, setUsername] = useState("");
  const [done, setDone] = useState(false);

  const navigate = useNavigate();

  // const clientID = "934760259390-idpvnt9md5ov9pr4lnoufcb0obh56eue.apps.googleusercontent.com";

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  async function createUserSignup() {
    await axios
      .post(
        `https://studio-backend-alpha.vercel.app/googleAuthSignup/${username}`,
        googleUserData
      )
      .then((response) => {
        localStorage.setItem("userID", response.data._id);
        localStorage.setItem("user", true);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  }

  async function handleUsername() {
    setDone(true);
    await axios
      .post("https://studio-backend-alpha.vercel.app/userExists", {
        username: username,
      })
      .then((test) => {
        if (test.status === 200) {
          createUserSignup();
        } else {
          setDone(false);
          alert("Username Not Available");
        }
      })
      .catch((err) => console.log(err));
  }

  async function createUser(data) {
    setGoogleUserData(data);
    setShowUsername(false);
  }

  async function loginUser(data) {
    await axios
      .post("https://studio-backend-alpha.vercel.app/googleAuthLogin", data)
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem("userID", response.data._id);
          localStorage.setItem("user", true);
        }
        navigate("/display");
      })
      .catch((err) => console.log(err));
  }

  async function onSuccess(res) {
    const decoded = jwtDecode(res.credential);
    await axios
      .post("https://studio-backend-alpha.vercel.app/googleAuthID", decoded)
      .then((data) => {
        if (data.status === 200) {
          createUser(decoded);
        } else if (data.status === 201) {
          loginUser(decoded);
        }
      })
      .catch((err) => console.log(err));
  }

  function onFailure(res) {
    console.log("Login Failed, Res -> ", res);
  }

  const onSubmitSignUp = async (data) => {
    const { username, password, email } = data;
    try {
      // Check if the user exists
      const userExistsResponse = await axios.post(
        `https://plugify.onrender.com/userExists`,
        { username }
      );
  
      if (userExistsResponse.status === 201 && userExistsResponse.data.success) {
        // If user exists, show error message
        console.error("Username already exists. Please choose another one.");
        alert("Username already exists. Please choose another one.");
      } else {
        // If user does not exist, proceed with signup
        const response = await axios.post(
          `https://plugify.onrender.com/adminsignup`,
          { username, password, email }
        );
  
        if (response.status === 200) {
          setShowSignupSuccessMessage(true);
          setTimeout(() => {
            setShowSignupSuccessMessage(false);
          }, 5000);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  

  const onSubmitSignIn = async (data) => {
    const { username, password } = data;
    try {
      const response = await axios.post(
        `https://plugify.onrender.com/adminlogin`,
        { username, password }
      );
      if (response.status === 200) {
        try {
          const authResponse = await axios.post(
            `https://plugify.onrender.com/auth`,
            { username, password }
          );
          document.cookie = `ACCESS_TOKEN=${authResponse.data}; HttpsOnly; Secure`;
        } catch (authError) {
          console.error(authError);
          alert("Authentication Error!");
        }

        sessionStorage.setItem("login", true);
        sessionStorage.setItem("username", username);
        navigate("/display");
      } else {
        setLoginMessage("Invalid Credentials");
      }
    } catch (err) {
      console.error(err);
      setLoginMessage("Invalid Credentials");
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    document.title = `Login - Plugify'`;
  }, []);

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
            <div className="google-h">
              <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
                className="padding"
                text="continue_with"
                size="medium"
                width="250"
              />
            </div>
          </form>
          <form
            onSubmit={handleSignupSubmit(onSubmitSignUp)}
            className={`sign-up-form ${isSignUpMode ? "" : "hidden"}`}
          >
            {showSignupSuccessMessage && (
              <div className="success-message">
                Sign Up Successful! You can now log in.
              </div>
            )}
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
            <p className="social-text">Or Sign up with Google</p>
            <div className="google-h">
              <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
                className="padding"
                text="continue_with"
                size="medium"
                width="200"
              />
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
              community that values your unique contributions. Sign up now and
              start your journey with us!
            </p>
            <button
              className="signup-btn transparent"
              id="sign-up-btn"
              onClick={handleSignUpClick}
            >
              Sign up
            </button>
          </div>
          <img
            src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
            className="image"
            alt="log"
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Welcome back! Login to access your account and continue where you
              left off. We are excited to see you again!
            </p>
            <button
              className="signup-btn transparent"
              id="sign-in-btn"
              onClick={handleSignInClick}
            >
              Sign in
            </button>
          </div>
          <img
            src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
            className="image"
            alt="register"
          />
        </div>
      </div>

      {!showUsername ? (
        <div className="popup">
          <div className="popup-inner">
            <h2>Enter a Username</h2>
            <input
              type="text"
              value={username}
              onChange={handleChange}
              placeholder="Username"
            />
            <button onClick={handleUsername} disabled={done}>
              {done ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
  
export default SignUpForm;
