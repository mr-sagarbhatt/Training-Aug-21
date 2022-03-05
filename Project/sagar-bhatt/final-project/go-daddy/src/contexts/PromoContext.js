import { createContext, useContext, useState, useEffect } from "react";
import { getCartPromo } from "../services/PromoService";

// *********** CONTEXT ***********
const PromoContext = createContext();

const usePromoContext = () => useContext(PromoContext);

const PromoProvider = ({ children }) => {
  const [promo, setPromo] = useState([]);
  const [promoLoader, setPromoLoader] = useState(false);

  // * GET CART PROMO *
  const fnGetCartPromo = async () => {
    try {
      setPromoLoader(true);
      //  * GET PROMO *
      const cartPromo = await getCartPromo();
      if (cartPromo.data.length > 0) {
        //  * SET PROMO *
        setPromo(cartPromo.data);
      } else {
        setPromo([]);
      }
      setPromoLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setPromoLoader(false);
    }
  };

  useEffect(() => {
    fnGetCartPromo();
  }, []);

  const value = {
    promoLoader,
    promo,
  };

  return (
    <PromoContext.Provider value={value}>{children}</PromoContext.Provider>
  );
};

export { PromoProvider, usePromoContext };
