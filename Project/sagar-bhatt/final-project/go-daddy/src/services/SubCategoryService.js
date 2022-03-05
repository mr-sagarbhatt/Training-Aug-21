import axios from "axios";
import axiosInstance from "./AuthServices";

const API_URL = `subcategory`;
const SUBCATEGORY_API_BASE_URL = process.env.REACT_APP_API_BASE_URL + API_URL;

const getAllSubCategories = async () => {
  return await axios.get(SUBCATEGORY_API_BASE_URL);
};

// const createSubCategory = async () => {
//   return await axiosInstance().get(API_URL);
// };

export { getAllSubCategories };
