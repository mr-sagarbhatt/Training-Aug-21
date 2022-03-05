import { encryptData, decryptData } from "./crypto-data";

// *********** GET USER TOKEN ***********
const getToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      return decryptData(token);
    }
  } catch (err) {
    console.log(err.message);
  }
};

// *********** SET USER TOKEN ***********
const setToken = (token) => {
  try {
    localStorage.setItem("token", encryptData(token));
  } catch (err) {
    console.log(err.message);
  }
};

// *********** REMOVE USER TOKEN ***********
const removeToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (err) {
    console.log(err.message);
  }
};

// *********** SET USER CART ***********
const lsSetCart = (cart) => {
  try {
    localStorage.setItem("cart", encryptData(cart));
  } catch (err) {
    console.log(err.message);
  }
};

// *********** GET USER CART ***********
const lsGetCart = () => {
  try {
    const cart = localStorage.getItem("cart");
    if (cart) {
      return decryptData(cart);
    }
  } catch (err) {
    console.log(err.message);
  }
};

// *********** REMOVE USER CART ***********
const lsRemoveCart = () => {
  try {
    localStorage.removeItem("cart");
  } catch (err) {
    console.log(err.message);
  }
};

export { setToken, getToken, removeToken, lsSetCart, lsGetCart, lsRemoveCart };
