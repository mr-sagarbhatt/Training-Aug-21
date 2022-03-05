import { createContext, useContext, useState, useEffect } from "react";
import { getAllCategories } from "../services/CategoryService";

// *********** CONTEXT ***********
const CategoryContext = createContext();

const useCategoryContext = () => useContext(CategoryContext);

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryLoader, setCategoryLoader] = useState(false);

  const getSetCategories = async () => {
    try {
      setCategoryLoader(true);
      //  * GET CATEGORIES *
      const categoryData = await getAllCategories();
      if (categoryData.data.length > 0) {
        //  * SET CATEGORIES *
        setCategories(categoryData.data);
      } else {
        setCategories([]);
      }
      setCategoryLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setCategoryLoader(false);
    }
  };

  useEffect(() => {
    getSetCategories();
  }, []);

  const value = {
    categoryLoader,
    categories,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryProvider, useCategoryContext };
