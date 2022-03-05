import axios from "axios";
import axiosInstance from "./AuthServices";

const API_URL = `discount`;
const DISCOUNT_API_BASE_URL = process.env.REACT_APP_API_BASE_URL + API_URL;

const getProductDiscount = async () => {
  return await axios.get(DISCOUNT_API_BASE_URL);
};

export { getProductDiscount };
