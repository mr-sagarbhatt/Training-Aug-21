import "./profile.scss";
import Header from "../../components/Header/Header";
import Copyrights from "../../components/Copyrights/Copyrights";
import MyProfile from "../../components/main/profile/MyProfile/MyProfile";

import { ServiceProvider } from "../../contexts/ServiceContext";
import { CategoryProvider } from "../../contexts/CategoryContext";
import { SubCategoryProvider } from "../../contexts/SubCategoryContext";
import { ProductProvider } from "../../contexts/ProductContext";
import { CartProvider } from "../../contexts/CartContext";
import { DiscountProvider } from "../../contexts/DiscountContext";

const Profile = () => {
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

      <main id='profile-main'>
        <MyProfile></MyProfile>
      </main>

      <div className='pt-5 mb-3'>
        <Copyrights></Copyrights>
      </div>
    </>
  );
};

export default Profile;
