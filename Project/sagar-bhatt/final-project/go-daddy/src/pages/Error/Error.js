import "./error.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ErrorCard from "../../components/cards/ErrorCard/ErrorCard";

import { ServiceProvider } from "../../contexts/ServiceContext";
import { CategoryProvider } from "../../contexts/CategoryContext";
import { SubCategoryProvider } from "../../contexts/SubCategoryContext";
import { ProductProvider } from "../../contexts/ProductContext";
import { CartProvider } from "../../contexts/CartContext";
import { DiscountProvider } from "../../contexts/DiscountContext";

const Error = () => {
  return (
    <>
      <ServiceProvider>
        <CategoryProvider>
          <SubCategoryProvider>
            <ProductProvider>
              <DiscountProvider>
                <CartProvider>
                  <Header></Header>
                </CartProvider>
              </DiscountProvider>
            </ProductProvider>
          </SubCategoryProvider>
        </CategoryProvider>
      </ServiceProvider>

      <ErrorCard></ErrorCard>

      <Footer></Footer>
    </>
  );
};

export default Error;
