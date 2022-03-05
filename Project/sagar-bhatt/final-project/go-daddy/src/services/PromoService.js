import axios from "axios";
import axiosInstance from "./AuthServices";

const API_URL = `promo`;
const PROMO_API_BASE_URL = process.env.REACT_APP_API_BASE_URL + API_URL;

const getCartPromo = async () => {
  return await axios.get(PROMO_API_BASE_URL);
};

export { getCartPromo };
