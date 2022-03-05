import "./sub-nav.scss";
import { useParams, Link } from "react-router-dom";
import { useCategoryContext } from "../../../../contexts/CategoryContext";
import { useSubCategoryContext } from "../../../../contexts/SubCategoryContext";

const SubNav = () => {
  const { categorySlug } = useParams();
  const { categories } = useCategoryContext();
  const { subCategories } = useSubCategoryContext();

  const category = categories.find(
    (category) => category?.slug === categorySlug
  );

  const subCategoryArray = subCategories.filter(
    (subCategory) => subCategory?.categoryId._id === category?._id
  );

  return (
    // <!-- sub-nav -->
    <section className='sub-nav'>
      <div className='sub-nav-title'>
        <span className='text-capitalize'>{category?.name}</span>
      </div>
      <ul className='sub-nav-menu'>
        {subCategoryArray.map((subCategory) => (
          <li className='sub-nav-item active'>
            <Link to={`/${category.slug}/${subCategory.slug}`}>
              {subCategory?.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SubNav;
