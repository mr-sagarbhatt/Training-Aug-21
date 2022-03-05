import { createContext, useContext, useState, useEffect } from "react";
import { getAllProducts } from "../services/ProductService";

// *********** CONTEXT ***********
const ProductContext = createContext();

const useProductContext = () => useContext(ProductContext);

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productLoader, setProductLoader] = useState(false);

  const getSetProducts = async () => {
    try {
      setProductLoader(true);
      //  * GET PRODUCTS *
      const productData = await getAllProducts();
      if (productData.data.length > 0) {
        //  * SET PRODUCTS *
        setProducts(productData.data);
      } else {
        setProducts([]);
      }
      setProductLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setProductLoader(false);
    }
  };

  useEffect(() => {
    getSetProducts();
  }, []);

  const value = {
    productLoader,
    products,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export { ProductProvider, useProductContext };
