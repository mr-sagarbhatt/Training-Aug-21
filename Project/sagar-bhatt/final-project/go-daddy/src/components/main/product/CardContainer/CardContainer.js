import "./card-container.scss";
import { useSubCategoryContext } from "../../../../contexts/SubCategoryContext";
import { useProductContext } from "../../../../contexts/ProductContext";
import { useCartContext } from "../../../../contexts/CartContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import DomainSearch from "../Domain/DomainSearch";

const CardContainer = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const { subCategorySlug } = useParams();
  const { productLoader, products } = useProductContext();
  const { subCategoryLoader, subCategories } = useSubCategoryContext();
  const { fnAddToCart } = useCartContext();

  const productsArray = products.filter(
    (product) => product?.subCategoryId.slug === subCategorySlug
  );
  const subCategory = subCategories.find(
    (subCategory) => subCategory?.slug === subCategorySlug
  );

  const addToCartHandler = (productId) => {
    navigate("/cart");
    fnAddToCart({ productId });
    // console.log(userCart);
  };

  return (
    // <!-- product-card-container -->
    <>
      {subCategoryLoader && productLoader ? (
        <Loader></Loader>
      ) : (
        <>
          {categorySlug === "domains" ? (
            <DomainSearch></DomainSearch>
          ) : (
            <section
              className='product-card-container'
              id='product-card-container'
            >
              {productsArray.length > 0 ? (
                <div className='card-group'>
                  {productsArray.map((product) => (
                    <div className='card product-card'>
                      <h3 className='title'>{product.name}</h3>
                      <div className='content'>{product.desc}</div>
                      <div className='price-content'>
                        <p className='price-wrapper'>
                          <span className='amount'>
                            &#x20B9; {product.price.toFixed(2)}
                          </span>
                          <span className='term'>/mo</span>
                        </p>
                      </div>
                      <div className='btn-container'>
                        <button
                          className='btn btn-dark'
                          onClick={() => {
                            addToCartHandler(product._id);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <div className='feature-list'>
                        <ul>
                          {product.extras.map((info) => (
                            <li>{info}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='no-products'>
                  {`${subCategory?.name} is not available at the moment.Please try again
          later.`}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </>
  );
};

export default CardContainer;
