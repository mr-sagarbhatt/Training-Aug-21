import Header from "../../components/Header/Header";
import SubNav from "../../components/main/product/SubNav/SubNav";
import ProductMarquee from "../../components/main/product/ProductMarquee/ProductMarquee";
import CardContainer from "../../components/main/product/CardContainer/CardContainer";
import FaqSection from "../../components/sections/FaqSection/FaqSection";
import Footer from "../../components/Footer/Footer";

import { ServiceProvider } from "../../contexts/ServiceContext";
import { CategoryProvider } from "../../contexts/CategoryContext";
import { SubCategoryProvider } from "../../contexts/SubCategoryContext";
import { ProductProvider } from "../../contexts/ProductContext";
import { CartProvider } from "../../contexts/CartContext";
import { DomainProvider } from "../../contexts/DomainContext";
import { DiscountProvider } from "../../contexts/DiscountContext";

const Product = () => {
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

      <ServiceProvider>
        <CategoryProvider>
          <SubCategoryProvider>
            <ProductProvider>
              <DiscountProvider>
                <CartProvider>
                  <main id='main'>
                    <DomainProvider>
                      <SubNav></SubNav>
                      <ProductMarquee></ProductMarquee>
                      <CardContainer></CardContainer>
                    </DomainProvider>
                  </main>
                </CartProvider>
              </DiscountProvider>
            </ProductProvider>
          </SubCategoryProvider>
        </CategoryProvider>
      </ServiceProvider>

      <FaqSection></FaqSection>
      <Footer></Footer>
    </>
  );
};

export default Product;
