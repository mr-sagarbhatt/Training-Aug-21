import { Link } from "react-router-dom";
import "./signin-card.scss";
import SignInForm from "../../forms/SignInForm/SignInForm";
import SocialLoginBtn from "../../buttons/SocialLoginBtn/SocialLoginBtn";
import Logo from "../../Logo/Logo";
import { useSigninContext } from "../../../contexts/SigninContext";
import {
  facebookProvider,
  googleProvider,
} from "../../../firebase/authMethods";
import ErrorAlert from "../../alert/ErrorAlert/ErrorAlert";

// *********** REACT ICONS ***********
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

import PageLoader from "../../Loader/PageLoader";

const SigninCard = () => {
  const { signInLoader, handleProvider, firebaseErrors } = useSigninContext();

  return (
    <>
      {signInLoader ? (
        <PageLoader></PageLoader>
      ) : (
        <section className='signin-card'>
          {/* // *********** LOGO *********** */}
          <div className='logo-container'>
            <Logo></Logo>
          </div>
          <h3 className='title display-3'>Sign in</h3>
          <div className='signup-link'>
            <span>New to Godaddy?</span>{" "}
            <Link to='/account/create'>Create an Account</Link>
          </div>
          {/* // *********** SHOW FIREBASE ERRORS *********** */}
          {firebaseErrors && <ErrorAlert error={firebaseErrors}></ErrorAlert>}
          <SignInForm></SignInForm>
          {/* // *********** SIGN IN OPTIONS *********** */}
          <div className='social-text'>or sign in with</div>
          <div className='social-buttons'>
            <SocialLoginBtn
              icon={<FaFacebook fontSize={21}></FaFacebook>}
              text='Facebook'
              socialLoginProvider={() => handleProvider(facebookProvider)}
            ></SocialLoginBtn>
            <SocialLoginBtn
              icon={<FaGoogle fontSize={21}></FaGoogle>}
              text='Google'
              socialLoginProvider={() => handleProvider(googleProvider)}
            ></SocialLoginBtn>
          </div>
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

export default SigninCard;
