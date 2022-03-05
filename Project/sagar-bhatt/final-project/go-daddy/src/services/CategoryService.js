import axios from "axios";
import axiosInstance from "./AuthServices";

const API_URL = `category`;
const CATEGORY_API_BASE_URL = process.env.REACT_APP_API_BASE_URL + API_URL;

const getAllCategories = async () => {
  return await axios.get(CATEGORY_API_BASE_URL);
};

// const createCategory = async () => {
//   return await axiosInstance().get(API_URL);
// };

export { getAllCategories };
