import React from 'react';
import { useForm } from 'react-hook-form';
import './SignUp.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGoogle, faLinkedinIn,  faXTwitter} from '@fortawesome/free-brands-svg-icons';

const SignInSignUpForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSignUpClick = () => {
    const container = document.querySelector('.signup-container');
    container.classList.add('sign-up-mode');
  };

  const handleSignInClick = () => {
    const container = document.querySelector('.signup-container');
    container.classList.remove('sign-up-mode');
  };

  //Created two distinct functions for login and signup forms.
  const onSubmitSignUp = (data) => {
    console.log(data);
  };

  const onSubmitSignIn = (data) => {
    console.log(data);
  };

  return (
    <div className="signup-container">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit(onSubmitSignIn)} className="sign-in-form">
            <h2 className="title-signup">Login</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="fas fa-user" />
              <input type="text" placeholder="Username" {...register('username')} />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="fas fa-lock"/>
              <input type="password" placeholder="Password" {...register('password')} />
            </div>
            <input type="submit" value="Login" className="signup-btn solid" />
            <p className="social-text">Or Login with social platforms</p>
            <div className="social-icons flex-centre">
                <a href="https://www.instagram.com/sahil_k17/" className="facebook bg-color">
                  <FontAwesomeIcon icon={faFacebookF} className="icon" />
                </a>
                <a href="https://www.instagram.com/sahil_k17/" className="twitter bg-color">
                  <FontAwesomeIcon icon={faXTwitter} className="icon " />
                </a>
                <a href="https://www.instagram.com/sahil_k17/" className="google bg-color">
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
          <form onSubmit={handleSubmit(onSubmitSignUp)} className="sign-up-form">
            <h2 className="title-signup">Sign up</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="fas fa-user" />
              <input type="text" placeholder="Username" {...register('username')} />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className="fas fa-envelope" />
              <input type="email" placeholder="Email" {...register('email')} />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="fas fa-lock" />
              <input type="password" placeholder="Password" {...register('password')} />
            </div>
            <input type="submit" value="Sign up" className="signup-btn" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-icons flex-centre">
                <a href="https://www.instagram.com/sahil_k17/" className="facebook bg-color">
                  <FontAwesomeIcon icon={faFacebookF} className="icon" />
                </a>
                <a href="https://www.instagram.com/sahil_k17/" className="twitter bg-color">
                  <FontAwesomeIcon icon={faXTwitter} className="icon " />
                </a>
                <a href="https://www.instagram.com/sahil_k17/" className="google bg-color">
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
            <p>Discover a world of possibilities! Join us and explore a vibrant community where ideas flourish and connections thrive.</p>
            <button className="abv-btn transparent" onClick={handleSignUpClick}>Sign up</button>
          </div>
          <img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of Our Valued Members</h3>
            <p>Thank you for being part of our community. Your presence enriches our shared experiences. Let's continue this journey together!</p>
            <button className="abv-btn transparent" onClick={handleSignInClick}>Login</button>
          </div>
          <img src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpForm;
