import { createContext, useContext, useState, useEffect } from "react";
import {
  getUserOrderByUserId,
  createUserOrder,
  razorpayVerifyPayment,
} from "../services/OrderService";

// *********** CONTEXT ***********
const OrderContext = createContext();

const useOrderContext = () => useContext(OrderContext);

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [orderLoader, setOrderLoader] = useState(false);

  // * GET USER ORDER *
  const fnGetUserOrderByUserId = async () => {
    try {
      setOrderLoader(true);
      const userOrder = await getUserOrderByUserId();
      if (userOrder.data.length > 0) {
        fnGetUserOrderByUserId();
      } else {
        setOrder([]);
      }
      setOrderLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setOrderLoader(false);
    }
  };

  useEffect(() => {
    // fnGetUserOrderByUserId();
  }, []);

  // * CREATE ORDER *
  const fnCreateUserOrder = async (data) => {
    try {
      setOrderLoader(true);
      //  * ADD TO ORDER *
      const userOrder = await createUserOrder(data);
      // if (userOrder) {
      //   fnGetUserOrderByUserId();
      // }
      setOrderLoader(false);
      return userOrder.data;
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setOrderLoader(false);
    }
  };

  // * CREATE PAYMENT *
  const fnCreateUserPayment = async (data) => {
    try {
      setOrderLoader(true);
      //  * ADD TO ORDER *
      const userPayment = await razorpayVerifyPayment(data);
      setOrderLoader(false);
      return userPayment.data;
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setOrderLoader(false);
    }
  };

  const value = {
    orderLoader,
    order,
    fnCreateUserOrder,
    fnCreateUserPayment,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export { OrderProvider, useOrderContext };
