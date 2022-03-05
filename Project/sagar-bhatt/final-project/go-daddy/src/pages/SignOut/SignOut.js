import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/local-storage";
import { useAuthContext } from "../../contexts/AuthContext";

const SignOut = () => {
  const navigate = new useNavigate();
  const { authLoader, setAuthLoader, setUserToken, setUser } = useAuthContext();

  useEffect(() => {
    setAuthLoader(true);
    removeToken();
    setUserToken("");
    setUser({});
    setAuthLoader(false);
    navigate("/");
  }, [navigate]);

  return <></>;
};

export default SignOut;
