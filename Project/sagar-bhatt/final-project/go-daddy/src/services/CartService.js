import axios from "axios";
import axiosInstance from "./AuthServices";

const API_URL = `cart`;
const PRODUCT_API_BASE_URL = process.env.REACT_APP_API_BASE_URL + API_URL;

const getUserCart = async () => {
  return await axiosInstance().get(API_URL);
};

const addToCart = async (cart) => {
  return await axiosInstance().post(API_URL, cart);
};

const updateCartItem = async (id, cart) => {
  return await axiosInstance().put(API_URL + `/${id}`, cart);
};

const deleteCartItem = async (id) => {
  return await axiosInstance().delete(API_URL + `/${id}`);
};

const deleteUserCart = async () => {
  return await axiosInstance().delete(API_URL);
};

export {
  getUserCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  deleteUserCart,
};
