import axios from "axios";
import axiosInstance from "./AuthServices";

const API_URL = `product`;
const PRODUCT_API_BASE_URL = process.env.REACT_APP_API_BASE_URL + API_URL;

const getAllProducts = async () => {
  return await axios.get(PRODUCT_API_BASE_URL);
};

// const createProduct = async () => {
//   return await axiosInstance().get(API_URL);
// };

export { getAllProducts };
