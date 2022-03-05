import axios from "axios";
import axiosInstance from "./AuthServices";

const API_URL = `order`;
const PRODUCT_API_BASE_URL = process.env.REACT_APP_API_BASE_URL + API_URL;

const getAllOrders = async () => {
  return await axiosInstance().get(API_URL);
};

const getUserOrderByNo = async (orderNo) => {
  return await axiosInstance().get(API_URL + `/${orderNo}`);
};

const getUserOrderByUserId = async () => {
  return await axiosInstance().get(API_URL + `/user`);
};

const createUserOrder = async (order) => {
  return await axiosInstance().post(API_URL, order);
};

const razorpayVerifyPayment = async (data) => {
  return await axiosInstance().post(API_URL + `/razorpay/verifyPayment`, data);
};

export {
  getAllOrders,
  getUserOrderByNo,
  getUserOrderByUserId,
  createUserOrder,
  razorpayVerifyPayment,
};
