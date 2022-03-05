import { createContext, useContext, useState, useEffect } from "react";
import { getAllSubCategories } from "../services/SubCategoryService";

// *********** CONTEXT ***********
const SubCategoryContext = createContext();

const useSubCategoryContext = () => useContext(SubCategoryContext);

const SubCategoryProvider = ({ children }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryLoader, setSubCategoryLoader] = useState(false);

  const getSetSubCategories = async () => {
    try {
      setSubCategoryLoader(true);
      //  * GET SUBCATEGORIES *
      const subCategoryData = await getAllSubCategories();
      if (subCategoryData.data.length > 0) {
        //  * SET SUBCATEGORIES *
        setSubCategories(subCategoryData.data);
      } else {
        setSubCategories([]);
      }
      setSubCategoryLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setSubCategoryLoader(false);
    }
  };

  useEffect(() => {
    getSetSubCategories();
  }, []);

  const value = {
    subCategoryLoader,
    subCategories,
  };

  return (
    <SubCategoryContext.Provider value={value}>
      {children}
    </SubCategoryContext.Provider>
  );
};

export { SubCategoryProvider, useSubCategoryContext };
