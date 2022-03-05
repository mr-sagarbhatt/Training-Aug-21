import axios from "axios";
import axiosInstance from "./AuthServices";

const API_URL = `users`;
const ACCOUNT_API_BASE_URL = process.env.REACT_APP_API_BASE_URL + API_URL;

const createAccount = async (user) => {
  return await axios.post(ACCOUNT_API_BASE_URL, user);
};

const userLogin = async (user) => {
  return await axios.post(ACCOUNT_API_BASE_URL + `/login`, user);
};

const getLoggedUser = async () => {
  return await axiosInstance().get(API_URL);
};

export { createAccount, userLogin, getLoggedUser };
