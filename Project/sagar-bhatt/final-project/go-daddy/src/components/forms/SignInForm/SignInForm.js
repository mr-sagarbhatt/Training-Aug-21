import { useState } from "react";
import "./signin-form.scss";
import { useSigninContext } from "../../../contexts/SigninContext";
import PageLoader from "../../Loader/PageLoader";

const SignInForm = () => {
  const { signInLoader, formValues, formErrors, handleSubmit, handleChange } =
    useSigninContext();
  const [inputType, setInputType] = useState("password");
  const changeInputType = () => {
    const password = document.getElementById("password");
    const type = inputType === "text" ? "password" : "text";
    setInputType(type);
    password.focus();
  };

  return (
    <>
      {signInLoader ? (
        <PageLoader></PageLoader>
      ) : (
        <form
          onSubmit={handleSubmit}
          className='needs-validation sign-in-form'
          noValidate
        >
          <div className='invalid-feedback'>{formErrors.extras}</div>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='user'
              placeholder='Enter username'
              name='user'
              value={formValues.user}
              onChange={handleChange}
            />
            <div className='invalid-feedback'>{formErrors.user}</div>
            <label htmlFor='user'>
              Username or Customer #<span className='text-danger'>*</span>
            </label>
          </div>
          <div className='form-floating password'>
            <input
              type={inputType}
              className='form-control'
              id='password'
              placeholder='Enter password'
              name='password'
              value={formValues.password}
              onChange={handleChange}
            />
            <div className='invalid-feedback'>{formErrors.password}</div>
            <span className='password-show' onClick={changeInputType}>
              {inputType === "password" ? "Show" : "Hide"}
            </span>
            <label htmlFor='password'>
              Password <span className='text-danger'>*</span>
            </label>
          </div>
          <div className='btn-submit w-100'>
            <button type='submit' className='btn btn-dark w-100'>
              Sign In
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default SignInForm;
