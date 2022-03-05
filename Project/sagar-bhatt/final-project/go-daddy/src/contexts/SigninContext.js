import { createContext, useContext, useState, useEffect } from "react";
import { validateFormValues } from "../validations/siginin-validation";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../services/AccountService";
import { socialMediaAuth } from "../firebase/auth";
import { setToken } from "../utils/local-storage";
import { useAuthContext } from "./AuthContext";

// *********** SIGNIN CONTEXT ***********
const SigninContext = createContext();
// *********** CUSTOM HOOK :: access context values ***********
const useSigninContext = () => useContext(SigninContext);

const SigninProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setUserToken } = useAuthContext();
  const [signInLoader, setSignInLoader] = useState(false);

  // *********** FORM VALUES ***********
  const initialValues = { user: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  // *********** FORM ERRORS ***********
  const [formErrors, setFormErrors] = useState({});
  // *********** FLAG FOR SUBMIT ***********
  const [isSubmit, setIsSubmit] = useState(false);
  // *********** FIREBASE SOCIAL USER ***********
  const [socialUser, setSocialUser] = useState({});
  // *********** FIREBASE ERRORS ***********
  const [firebaseErrors, setFirebaseErrors] = useState();
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

  // *********** LOGIN PASSWORD USER  ***********
  const asyncSignin = async () => {
    try {
      let data = {
        ...formValues,
        authTypeId: 3,
      };
      const res = await userLogin(data);
      console.log(res);
      if (res) {
        setToken(res.data.token);
        setUserToken(res.data.token);
        //  * GET LOGGED USER *
        // const userData = await getLoggedUser();
        //  * SET LOGGED USER *
        // await setLoggedUSer(userData.data);
        navigate("/", { replace: true });
      }
    } catch (err) {
      // *********** handle mongoose errors ***********
      const extras = err.response.data.message;
      let errors = { extras };
      setFormErrors(errors);
    }
  };

  // *********** HANDLE SIGNIN PROVIDER :: facebook, google *********** */
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
        user: user.email,
        authTypeId,
        firebaseUId: user.uid,
      };
      setSocialUser(user);
    } catch (err) {
      setFirebaseErrors(err.response.data.message);
    }
  };

  // *********** LOGIN SOCIAL USER  ***********
  const asyncSigninSocialAccount = async () => {
    try {
      const res = await userLogin(socialUser);
      if (res) {
        setToken(res.data.token);
        setUserToken(res.data.token);
        //  * GET LOGGED USER *
        // const userData = await getLoggedUser();
        //  * SET LOGGED USER *
        // await setLoggedUSer(userData.data);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err.response.data.message);
      setFirebaseErrors(err.response.data.message);
    }
  };

  // *********** SUBMIT FORM :: on isSubmit true ***********
  useEffect(() => {
    setSignInLoader(true);
    if (Object.keys(socialUser).length > 0) {
      asyncSigninSocialAccount();
    } else {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        asyncSignin();
      }
    }
    setSignInLoader(false);
  }, [formErrors, formValues, isSubmit, navigate, socialUser]);

  const value = {
    signInLoader,
    formValues,
    formErrors,
    handleSubmit,
    handleChange,
    handleProvider,
    firebaseErrors,
  };
  return (
    <SigninContext.Provider value={value}>{children}</SigninContext.Provider>
  );
};

export { SigninProvider, useSigninContext };
