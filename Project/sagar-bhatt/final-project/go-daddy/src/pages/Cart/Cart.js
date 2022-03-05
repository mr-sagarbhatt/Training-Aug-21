import Header from "../../components/Header/Header";
import CartHeader from "../../components/main/cart/CartHeader/CartHeader";
import CartContainer from "../../components/main/cart/CartContainer/CartContainer";
import Copyrights from "../../components/Copyrights/Copyrights";

import { ServiceProvider } from "../../contexts/ServiceContext";
import { CategoryProvider } from "../../contexts/CategoryContext";
import { SubCategoryProvider } from "../../contexts/SubCategoryContext";
import { CartProvider } from "../../contexts/CartContext";
import { DiscountProvider } from "../../contexts/DiscountContext";
import { PromoProvider } from "../../contexts/PromoContext";
import { OrderProvider } from "../../contexts/OrderContext";
import { ProductProvider } from "../../contexts/ProductContext";

const Cart = () => {
  return (
    <>
      <ServiceProvider>
        <CategoryProvider>
          <SubCategoryProvider>
            <ProductProvider>
              <DiscountProvider>
                <PromoProvider>
                  <CartProvider>
                    <OrderProvider>
                      <Header page='cart'></Header>
                    </OrderProvider>
                  </CartProvider>
                </PromoProvider>
              </DiscountProvider>
            </ProductProvider>
          </SubCategoryProvider>
        </CategoryProvider>
      </ServiceProvider>

      <ProductProvider>
        <DiscountProvider>
          <PromoProvider>
            <CartProvider>
              <OrderProvider>
                <CartContainer></CartContainer>
              </OrderProvider>
            </CartProvider>
          </PromoProvider>
        </DiscountProvider>
      </ProductProvider>

      <Copyrights></Copyrights>
    </>
  );
};

export default Cart;
