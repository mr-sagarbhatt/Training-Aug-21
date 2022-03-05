import axios from "axios";
import { getToken } from "../utils/local-storage";

const URL = process.env.REACT_APP_API_BASE_URL;

// * RETURN AXIOS INSTANCE
const axiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: URL,
  });
  let token = getToken();
  if (token) {
    axiosInstance.defaults.headers.common["x-access-token"] = token;
  }
  return axiosInstance;
};

export default axiosInstance;
