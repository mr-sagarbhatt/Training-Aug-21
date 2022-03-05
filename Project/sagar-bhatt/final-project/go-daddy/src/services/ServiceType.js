import axios from "axios";
import axiosInstance from "./AuthServices";

const API_URL = `service`;
const SERVICE_API_BASE_URL = process.env.REACT_APP_API_BASE_URL + API_URL;

const getAllServices = async () => {
  return await axios.get(SERVICE_API_BASE_URL);
};

// const createService = async () => {
//   return await axiosInstance().get(API_URL);
// };

export { getAllServices };
