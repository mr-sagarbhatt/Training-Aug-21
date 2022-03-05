import "./product-marquee.scss";
import { useParams } from "react-router-dom";
import { useCategoryContext } from "../../../../contexts/CategoryContext";
import { useSubCategoryContext } from "../../../../contexts/SubCategoryContext";

const ProductMarquee = () => {
  const { categorySlug, subCategorySlug } = useParams();
  const { categories } = useCategoryContext();
  const { subCategories } = useSubCategoryContext();

  const category = categories.find(
    (category) => category?.slug === categorySlug
  );

  const subCategory = subCategories.find(
    (subCategory) => subCategory?.slug === subCategorySlug
  );

  return (
    // <!-- product-marquee -->
    <section className='product-marquee'>
      <div className='primary-card'>
        <div>
          <h1 className='title'>{subCategory?.name}</h1>
          <h2 className='heading'>{category?.serviceId.desc}</h2>
          <div className='bottom'>
            {/* <button className='btn btn-dark' id='plansPricing'>
              See Plans and Pricing
            </button> */}
          </div>
        </div>
      </div>
      {/* <div className='secondary-card'>
        <p>
          <strong>Trust Web Hosting, here's why:</strong>
        </p>
        <ul>
          <li>Expert hosting support available 24/7/365.</li>
          <li>Superior performance and load times.</li>
          <li>Reliable web hosting with 99.9% uptime guaranteed.</li>
        </ul>
      </div> */}
    </section>
  );
};

export default ProductMarquee;
