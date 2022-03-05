import "./signup-form.scss";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSignupContext } from "../../../contexts/SignupContext";
import PageLoader from "../../Loader/PageLoader";

const zxcvbn = require("zxcvbn");

const SignUpForm = () => {
  const { signUpLoader, formValues, formErrors, handleChange, handleSubmit } =
    useSignupContext();

  // *********** HIDE/SHOW PASSWORD :: password or text ***********
  const [inputType, setInputType] = useState("password");
  // *********** PASSWORD STRENGTH SCORE :: null, o-4 ***********
  const [passwordScore, setPasswordScore] = useState(null);
  // *********** PASSWORD STRENGTH MESSAGE ***********
  const [strengthMsg, setStrengthMsg] = useState("Very Weak");

  // *********** HIDE/SHOW PASSWORD ***********
  const changeInputType = () => {
    const password = document.getElementById("password");
    const type = inputType === "text" ? "password" : "text";
    setInputType(type);
    password.focus();
  };

  // *********** SET PASSWORD STRENGTH ***********
  const passwordStrength = (e) => {
    let pw;
    if (e.target.value === "") {
      setPasswordScore(null);
    } else {
      pw = zxcvbn(e.target.value);
      setPasswordScore(pw.score);
    }
    // *********** SET PASSWORD MSG ***********
    if (pw.score === 0 || passwordScore === null) {
      setStrengthMsg("Very Weak");
    } else if (pw.score === 1) {
      setStrengthMsg("Weak");
    } else if (pw.score === 2) {
      setStrengthMsg("Moderate");
    } else if (pw.score === 3) {
      setStrengthMsg("Strong");
    } else if (pw.score === 4) {
      setStrengthMsg("Very Strong");
    }
  };

  return (
    <>
      {signUpLoader ? (
        <PageLoader></PageLoader>
      ) : (
        <form
          onSubmit={handleSubmit}
          className='needs-validation sign-up-form'
          noValidate
        >
          <div className='invalid-feedback'>{formErrors.extras}</div>
          <div className='form-floating position-relative'>
            <input
              type='text'
              className='form-control'
              id='email'
              placeholder='Email'
              name='email'
              value={formValues.email}
              onChange={handleChange}
              autoFocus
            />
            <div className='invalid-feedback'>{formErrors.email}</div>
            <label htmlFor='email' className='form-label'>
              Email <span className='text-danger'>*</span>
            </label>
          </div>
          <div className='form-floating  position-relative'>
            <input
              type='text'
              className='form-control'
              id='userName'
              placeholder='Username'
              name='userName'
              value={formValues.userName}
              onChange={handleChange}
            />
            <div className='invalid-feedback'>{formErrors.userName}</div>
            <label htmlFor='username' className='form-label'>
              Username <span className='text-danger'>*</span>
            </label>
          </div>
          <div className='form-floating  position-relative password'>
            <input
              type={inputType}
              className='form-control passField'
              id='password'
              placeholder='Password'
              name='password'
              value={formValues.password}
              onChange={(e) => {
                handleChange(e);
                passwordStrength(e);
              }}
            />
            <div className='invalid-feedback'>{formErrors.password}</div>
            <div className='password-show' onClick={changeInputType}>
              {inputType === "password" ? "Show" : "Hide"}
            </div>
            <div className='password-card'>
              <div className='password-msg'>
                <span className='ps-2 pe-3'>
                  <FaCheck fontSize={17} color={"grey"}></FaCheck>
                </span>
                Be at least 9 characters
              </div>
              <div
                className='password-strength'
                data-password-score={passwordScore || 0}
              >
                {strengthMsg}
              </div>
              <div className='progress'>
                <div
                  className='progress-bar bg-danger'
                  style={{ minWidth: "20%" }}
                  role='progressbar'
                  aria-valuenow='20'
                  aria-valuemin='20'
                  aria-valuemax='100'
                ></div>
              </div>
            </div>
            <label htmlFor='password' className='form-label'>
              Password <span className='text-danger'>*</span>
            </label>
          </div>
          <div className='btn-submit w-100'>
            <button type='submit' className='btn btn-dark w-100'>
              Create Account
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default SignUpForm;
