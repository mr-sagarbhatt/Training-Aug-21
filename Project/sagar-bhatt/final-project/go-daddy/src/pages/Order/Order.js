import "./order.scss";
import Header from "../../components/Header/Header";
import Copyrights from "../../components/Copyrights/Copyrights";
import MyOrder from "../../components/main/MyOrder/MyOrder";

import { ServiceProvider } from "../../contexts/ServiceContext";
import { CategoryProvider } from "../../contexts/CategoryContext";
import { SubCategoryProvider } from "../../contexts/SubCategoryContext";
import { ProductProvider } from "../../contexts/ProductContext";
import { CartProvider } from "../../contexts/CartContext";
import { DiscountProvider } from "../../contexts/DiscountContext";

const Order = () => {
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

      <main id='order-main'>
        <MyOrder></MyOrder>
      </main>

      <Copyrights></Copyrights>
    </>
  );
};

export default Order;
