import { useState } from "react";
import { Link } from "react-router-dom";
import "./signup-card.scss";
import SocialLoginBtn from "../../buttons/SocialLoginBtn/SocialLoginBtn";
import SignUpForm from "../../forms/SignUpForm/SignUpForm";
import Logo from "../../Logo/Logo";
import {
  facebookProvider,
  googleProvider,
} from "../../../firebase/authMethods";
import { useSignupContext } from "../../../contexts/SignupContext";
import ErrorAlert from "../../alert/ErrorAlert/ErrorAlert";

// *********** REACT ICONS ***********
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";

import PageLoader from "../../Loader/PageLoader";

const SignupCard = () => {
  // *********** STATE FOR EMAIL OPTION  *********** */
  const [email, setEmail] = useState(false);

  // *********** CHANGE EMAIL OPTION  *********** */
  const changeEmail = () => {
    setEmail(!email);
  };

  // *********** HANDLE SIGNUP PROVIDER :: facebook, google *********** */
  const { signUpLoader, handleProvider, firebaseErrors } = useSignupContext();
  return (
    <>
      {signUpLoader ? (
        <PageLoader></PageLoader>
      ) : (
        <section className='signup-card'>
          {/* // *********** LOGO *********** */}
          <div className='logo-container'>
            <Logo></Logo>
          </div>
          <h3 className='title display-3'>Create an Account</h3>

          {!email ? (
            <>
              {/* // *********** NOT SELECTED EMAIL OPTION *********** */}
              <div className='signin-link'>
                <span>Already have an account?</span>{" "}
                <Link to='/login'>Sign In</Link>
              </div>
              {/* // *********** SHOW FIREBASE ERRORS *********** */}
              {firebaseErrors && (
                <ErrorAlert error={firebaseErrors}></ErrorAlert>
              )}
              {/* // *********** SOCIAL LOGIN BUTTONS *********** */}
              <SocialLoginBtn
                icon={<FaFacebook fontSize={21}></FaFacebook>}
                text='Continue with Facebook'
                socialLoginProvider={() => handleProvider(facebookProvider)}
              ></SocialLoginBtn>
              <SocialLoginBtn
                icon={<FaGoogle fontSize={21}></FaGoogle>}
                text='Continue with Google'
                socialLoginProvider={() => handleProvider(googleProvider)}
              ></SocialLoginBtn>
              <SocialLoginBtn
                icon={<FaRegEnvelope fontSize={21}></FaRegEnvelope>}
                text='Continue with Email'
                changeEmail={changeEmail}
              ></SocialLoginBtn>
            </>
          ) : (
            <>
              {/* // *********** SELECTED EMAIL OPTION *********** */}
              <div className='signin-link'>
                <a onClick={changeEmail}>Back to previous step</a>
              </div>
              <SignUpForm></SignUpForm>
            </>
          )}
          {/* // *********** PRIVACY POLICY *********** */}
          <div className='privacy'>
            By creating an account, you agree to GoDaddy's{" "}
            <a href='https://in.godaddy.com/legal/agreements/universal-terms-of-service-agreement'>
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href='https://in.godaddy.com/legal/agreements/privacy-policy'>
              Privacy Policy.
            </a>
          </div>
        </section>
      )}
    </>
  );
};

export default SignupCard;
