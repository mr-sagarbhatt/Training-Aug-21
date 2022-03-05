import { createContext, useContext, useState, useEffect } from "react";
import { getToken } from "../utils/local-storage";
import { getLoggedUser } from "../services/AccountService";

// *********** CONTEXT ***********
const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  // *********** CURRENT USER ***********
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState({});
  const [authLoader, setAuthLoader] = useState(false);

  useEffect(() => {
    setAuthLoader(true);
    const token = getToken();
    setUserToken(token);
    setAuthLoader(false);
  }, []);

  // *********** SET CURRENT USER WHEN USER LOGGED IN ***********
  const setLoggedUSer = async () => {
    if (userToken !== "") {
      try {
        setAuthLoader(true);
        //  * GET LOGGED USER *
        const userData = await getLoggedUser();
        if (Object.keys(userData.data).length > 0) {
          //  * SET LOGGED USER *
          // await setLoggedUSer(userData.data);
          setUser(userData.data);
        } else {
          setUser({});
        }
        setAuthLoader(false);
      } catch (err) {
        console.log(err.response.data.message || err.message);
        setAuthLoader(false);
      }
    } else {
      setUser({});
    }
  };

  // *********** GET CURRENT USER WHEN USER LOGGED IN ***********
  useEffect(() => {
    setLoggedUSer();
  }, [userToken]);

  const value = {
    authLoader,
    setAuthLoader,
    user,
    setUser,
    setUserToken,
    setLoggedUSer,
  };

  // *********** CONTEXT PROVIDER :: provide current user to app ***********
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuthContext };
