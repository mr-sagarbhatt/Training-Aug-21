import { createContext, useContext, useState, useEffect } from "react";
import { getProductDiscount } from "../services/DiscountService";

// *********** CONTEXT ***********
const DiscountContext = createContext();

const useDiscountContext = () => useContext(DiscountContext);

const DiscountProvider = ({ children }) => {
  const [discount, setDiscount] = useState([]);
  const [discountLoader, setDiscountLoader] = useState(false);

  // * GET PRODUCT DISCOUNT *
  const fnGetProductDiscount = async () => {
    try {
      setDiscountLoader(true);
      //  * GET DISCOUNT *
      const productDiscount = await getProductDiscount();
      if (productDiscount.data.length > 0) {
        //  * SET DISCOUNT *
        setDiscount(productDiscount.data);
      } else {
        setDiscount([]);
      }
      setDiscountLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setDiscountLoader(false);
    }
  };

  useEffect(() => {
    fnGetProductDiscount();
  }, []);

  const value = {
    discountLoader,
    discount,
  };

  return (
    <DiscountContext.Provider value={value}>
      {children}
    </DiscountContext.Provider>
  );
};

export { DiscountProvider, useDiscountContext };
