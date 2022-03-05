import { createContext, useContext, useState, useEffect } from "react";
import { createAccount } from "../services/AccountService";
import { userLogin } from "../services/AccountService";
import { useNavigate } from "react-router-dom";
import { validateFormValues } from "../validations/signup-validation";
import { createPasswordAuth } from "../firebase/auth";
import { socialMediaAuth } from "../firebase/auth";
import { setToken } from "../utils/local-storage";
import { useAuthContext } from "./AuthContext";

// *********** SIGNUP CONTEXT ***********
const SignupContext = createContext();
// *********** CUSTOM HOOK :: access context values ***********
const useSignupContext = () => useContext(SignupContext);

const SignupProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setUserToken } = useAuthContext();
  const [signUpLoader, setSignUpLoader] = useState(false);

  // *********** FORM VALUES ***********
  const initialValues = { email: "", userName: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  // *********** FORM ERRORS ***********
  const [formErrors, setFormErrors] = useState({});
  // *********** FIREBASE SOCIAL USER ***********
  const [socialUser, setSocialUser] = useState({});
  // *********** FIREBASE ERRORS ***********
  const [firebaseErrors, setFirebaseErrors] = useState();
  // *********** FLAG FOR SUBMIT ***********
  const [isSubmit, setIsSubmit] = useState(false);

  // *********** SET FORM VALUES ***********
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // *********** SUBMIT FORM VALUES ***********
  const handleSubmit = (e) => {
    e.preventDefault();
    // * VALIDATION :: SET FORM ERRORS *
    setFormErrors(validateFormValues(formValues));
    // * FORM SUBMIT ON TRUE *
    setIsSubmit(true);
  };

  // *********** CREATE PASSWORD USER ACCOUNT ***********
  const asyncCreateAccount = async () => {
    try {
      // const user = await createPasswordAuth(
      //   formValues.email,
      //   formValues.password
      // );
      // console.log(user);
      let data = {
        ...formValues,
        authTypeId: 3,
      };
      const res = await createAccount(data);
      if (res) {
        let userData = {
          user: formValues.userName,
          password: formValues.password,
          authTypeId: formValues.authTypeId,
        };
        console.log(userData);
        const loginUser = await userLogin(userData);
        if (loginUser) {
          setToken(loginUser.data.token);
          setUserToken(loginUser.data.token);
          navigate("/", { replace: true });
        }
      }
    } catch (err) {
      // *********** handle mongoose errors ***********
      const extras = err.response.data.message;
      let errors;
      if (extras.includes("Username")) {
        errors = { userName: extras };
      } else if (extras.includes("Email")) {
        errors = { email: extras };
      } else if (extras.includes("Password")) {
        errors = { password: extras };
      } else {
        errors = { extras };
      }
      setFormErrors(errors);
    }
  };

  // *********** HANDLE SIGNUP PROVIDER :: facebook, google *********** */
  const handleProvider = async (provider) => {
    try {
      let user = await socialMediaAuth(provider);
      let authTypeId;
      if (user.providerData[0].providerId === "google.com") {
        authTypeId = 1;
      }
      if (user.providerData[0].providerId === "facebook.com") {
        authTypeId = 2;
      }
      user = {
        firebaseUId: user.uid,
        email: user.email,
        userName: user.email,
        authTypeId,
      };
      setSocialUser(user);
    } catch (err) {
      setFirebaseErrors(err.response.data.message);
    }
  };

  // *********** CREATE SOCIAL USER ACCOUNT ***********
  const asyncCreateSocialAccount = async () => {
    try {
      console.log(socialUser);
      const res = await createAccount(socialUser);
      console.log(res);
      if (res) {
        let userData = {
          user: socialUser.userName,
          authTypeId: socialUser.authTypeId,
          firebaseUId: socialUser.firebaseUId,
        };
        console.log(userData);
        const loginUser = await userLogin(userData);
        if (loginUser) {
          setToken(loginUser.data.token);
          setUserToken(loginUser.data.token);
          navigate("/", { replace: true });
        }
      }
    } catch (err) {
      console.log(err.response.data.message);
      setFirebaseErrors(err.response.data.message);
    }
  };

  // *********** SUBMIT FORM :: on isSubmit true ***********
  useEffect(() => {
    setSignUpLoader(true);
    if (Object.keys(socialUser).length > 0) {
      asyncCreateSocialAccount();
    } else {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        asyncCreateAccount();
      }
    }
    setSignUpLoader(false);
  }, [formErrors, formValues, isSubmit, navigate, socialUser]);

  const value = {
    signUpLoader,
    formValues,
    formErrors,
    handleChange,
    handleSubmit,
    handleProvider,
    firebaseErrors,
  };

  // *********** CONTEXT PROVIDER ***********
  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
};

export { SignupProvider, useSignupContext };
