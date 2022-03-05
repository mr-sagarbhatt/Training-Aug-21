import { useAuthContext } from "../../contexts/AuthContext";
import "./header.scss";
import Icon from "../../assets/images/svg/GoDaddy-Icon-Black-Logo.wine.svg";
import Logo from "../../assets/images/svg/GoDaddy-Black-Logo.wine.svg";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useServiceContext } from "../../contexts/ServiceContext";
import { useCategoryContext } from "../../contexts/CategoryContext";
import { useSubCategoryContext } from "../../contexts/SubCategoryContext";
import { useCartContext } from "../../contexts/CartContext";
import PageLoader from "../Loader/PageLoader";

const Header = ({ page }) => {
  const extras = [
    {
      _id: 1,
      image:
        "https://drive.google.com/uc?export=view&id=17QEpaC2ova7qPrsZ0BSkJKeAFkrp8KAs",
      linkText: "Transfer your domains",
      link: "#",
    },
    {
      _id: 2,
      image:
        "https://drive.google.com/uc?export=view&id=1pRKCFdX69c6Hv6QvjCOU9ZDQJQleQ0e5",
      linkText: "Compare Hosting Options",
      link: "#",
    },
    {
      _id: 3,
      image:
        "https://drive.google.com/uc?export=view&id=1djaamjTiVqe74YyarKj7I9F2xvHIku3U",
      linkText: "Get help selecting the right type of SSL Certificate",
      link: "#",
    },
    {
      _id: 4,
      image:
        "https://drive.google.com/uc?export=view&id=1ZkLlGpV-WQXx2UCwWFB3tqc9X-RLFeXm",
      linkText: "Tools to help your small business clients get bigger",
      link: "#",
    },
  ];

  const { authLoader, user } = useAuthContext();
  let { serviceLoader, services } = useServiceContext();
  let { categoryLoader, categories } = useCategoryContext();
  let { subCategoryLoader, subCategories } = useSubCategoryContext();
  const { cartLoader, cart } = useCartContext();

  services = services.map((service, index) => {
    if (service._id === extras[index]._id) {
      service.image = extras[index].image;
      service.linkText = extras[index].linkText;
      service.link = extras[index].link;
      return service;
    }
  });

  return (
    // <!-- header -->
    <>
      {serviceLoader &&
      categoryLoader &&
      subCategoryLoader &&
      authLoader &&
      cartLoader ? (
        <PageLoader></PageLoader>
      ) : (
        <header className='header d-flex justify-content-between flex-wrap'>
          <div className='left-items d-flex align-items-center justify-content-start'>
            <nav className='navbar navbar-expand-xxl navbar-light'>
              <div className='container-fluid px-0 py-0'>
                <a className='navbar-brand order-2 order-md-0 me-2'>
                  <Link to='/' className='text-black'>
                    <img className='icon' src={Icon} alt='logo' />
                    <img className='logo' src={Logo} alt='logo' />
                    <span className='country-name d-none'>India</span>
                  </Link>
                </a>
                <button
                  className='navbar-toggler'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#navbarNav'
                  aria-controls='navbarNav'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
                >
                  <span className='navbar-toggler-icon'></span>
                </button>
                <div
                  className='collapse navbar-collapse small-screen-nav'
                  id='navbarNav'
                >
                  <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                  >
                    {/* <!-- <span className="navbar-toggler-icon"></span> --> */}
                    {/* <i className='fas fa-times'></i> */}
                    <FaTimes></FaTimes>
                  </button>
                  <ul className='navbar-nav'>
                    {services.map((service, index) => (
                      <li className='nav-item active'>
                        <a
                          className='nav-link collapsed text-capitalize'
                          href='#'
                          role='button'
                          data-bs-toggle='collapse'
                          data-bs-target={`#nav-sub-${index}`}
                          aria-expanded='false'
                          aria-controls={`nav-sub-${index}`}
                        >
                          {service.name}
                        </a>
                        <div
                          className='nav-sub-container collapse'
                          id={`nav-sub-${index}`}
                        >
                          {categories
                            .filter(
                              (category) =>
                                category.serviceId._id === service._id &&
                                category.serviceId.name === "domains"
                            )
                            .map((filteredCategory) => (
                              <ul className='nav-sub'>
                                <li className='nav-sub-link nav-sub-title'>
                                  <strong className='text-capitalize'>
                                    {filteredCategory.name}
                                  </strong>
                                </li>
                                {subCategories
                                  .filter(
                                    (subCategory) =>
                                      subCategory.categoryId._id ===
                                      filteredCategory._id
                                  )
                                  .map((filteredSubCategory) => (
                                    <li className='nav-sub-link'>
                                      <Link
                                        to={`/${filteredCategory.slug}/${filteredSubCategory.slug}`}
                                      >
                                        {filteredSubCategory.name}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            ))}

                          {categories
                            .filter(
                              (category) =>
                                category.serviceId._id === service._id &&
                                category.serviceId.name !== "domains"
                            )
                            .map((filteredCategory) => (
                              <ul className='nav-sub'>
                                <li className='nav-sub-link nav-sub-title'>
                                  <strong className='text-capitalize'>
                                    {filteredCategory.name}
                                  </strong>
                                </li>
                                {subCategories
                                  .filter(
                                    (subCategory) =>
                                      subCategory.categoryId._id ===
                                      filteredCategory._id
                                  )
                                  .map((filteredSubCategory) => (
                                    <li className='nav-sub-link'>
                                      <Link
                                        to={`/${filteredCategory.slug}/${filteredSubCategory.slug}`}
                                      >
                                        {filteredSubCategory.name}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            ))}
                          <div className='img-container'>
                            <img
                              className='img-fluid img'
                              src={service.image}
                              alt='Nav Pro Desktop Domains'
                            />
                            <a href={service.link} className='nav-img-link'>
                              {service.linkText}
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                    {/* <a
                  className='nav-link collapse-show-more'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseNavLink'
                >
                  More
                </a> */}
                    {/* <div className='collapse collapse-show-lg' id='collapseNavLink'> */}
                    <li className='nav-item'>
                      <a
                        className='nav-link collapsed'
                        href='#'
                        role='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#nav-sub-5'
                        aria-expanded='false'
                        aria-controls='nav-sub-5'
                      >
                        For web Professionals
                      </a>
                      <div
                        className='nav-sub-container collapse'
                        id='nav-sub-5'
                      >
                        <ul className='nav-sub'>
                          <li className='nav-sub-link nav-sub-title'>
                            <strong>Welcome to GoDaddy Pro</strong>
                          </li>
                          <li className='nav-sub-link'>
                            <a href='#'>
                              Do more for clients with GoDaddy Pro, our
                              ever-growing set of products, tools, content and
                              support tailored to the unique business needs of
                              web designers and developers.
                            </a>
                          </li>
                          <button className='btn btn-dark btn-custom m-0'>
                            <span>Enter GoDaddy Pro Site</span>
                          </button>
                        </ul>
                      </div>
                    </li>
                    {/* </div> */}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className='right-items d-flex align-items-center flex-wrap'>
            <div className='contact ms-4'>
              <div data-bs-toggle='collapse' data-bs-target='#collapseContact'>
                <div className='right-text'>040 67607600</div>
                <img
                  src='https://drive.google.com/uc?export=view&id=1KfpLDcBRMmLsD1Xi70oEJEKUrKLsp-UG'
                  alt='contact'
                />
              </div>
              <div className='collapse' id='collapseContact'>
                <div
                  className='close-icon pt-4'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseContact'
                >
                  {/* <i className='fas fa-times fs-5'></i> */}
                  <FaTimes></FaTimes>
                </div>
                <div id='contactContent'>
                  <div className='callUs mb-5'>
                    <div className='right-title'>Call Us</div>
                    <div className='sub-title mt-3'>
                      Call Our Award Winning Support 24/7
                    </div>
                    <a className='right-link' href='tel:040 67607600'>
                      040 67607600
                    </a>
                    <div className='sub-title mt-3'>Global Directory</div>
                    <a
                      className='right-link'
                      href='https://in.godaddy.com/contact-us'
                    >
                      Phone numbers and hours
                    </a>
                  </div>
                  <div className='chatNow mb-3'>
                    <div className='right-title'>Chat Now</div>
                    <div className='sub-title mt-3'>
                      Chat with our sales &amp; support team for quick answers
                      on product features, pricing and more.
                      <p className='mt-3'>Hours: 24x7 Chat</p>
                      <a className='btn btn-dark fw-bold px-4'>Chat Now</a>
                      <br />
                      <a className='btn btn-outline-dark fw-bold mt-3 px-4'>
                        WhatsApp at +91 40 6760 7655
                      </a>
                    </div>
                  </div>
                  <div className='helpCenter mb-4'>
                    <div className='right-title'>Help Center</div>
                    <div className='sub-title mt-3'>
                      Explore our online help resources
                      <br />
                      <a className='btn btn-outline-dark fw-bold mt-3 px-4'>
                        Get Help
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='blog ms-4'>
              <div className='right-text'>Blog</div>
            </div>
            <div className='help ms-4'>
              <div className='right-text'>Help</div>
              <img
                src='https://drive.google.com/uc?export=view&id=1TkeGnxcG6aQ9L0jEsSiftkz2qJZ2yhv9'
                alt='help'
              />
            </div>
            <div className='user ms-4'>
              <div data-bs-toggle='collapse' data-bs-target='#collapseSignIn'>
                <div className='right-text'>
                  {Object.keys(user).length > 0 ? user.userName : "Sign In"}
                </div>
                <img
                  src='https://drive.google.com/uc?export=view&id=1dIJcxPNt-Nootme1puNGNAoRjhFvGl_K'
                  alt='user'
                />
              </div>
              <div className='collapse' id='collapseSignIn'>
                <div className='caret'></div>
                <div
                  className='signin-close-icon pt-4'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseSignIn'
                >
                  {/* <i className='fas fa-times'></i> */}
                  <FaTimes></FaTimes>
                </div>
                <div id='userContent'>
                  {Object.keys(user).length <= 0 ? (
                    <>
                      <div className='sign-in'>
                        <div className='right-title mb-4'>Registered User</div>
                        <div className='sub-title'>
                          Have an account? Sign in now.
                        </div>
                        <Link to='/login' className='right-link'>
                          Sign In
                        </Link>
                      </div>
                      <div className='dropdown-divider'></div>
                      <div className='sign-up'>
                        <div className='right-title mb-4'>New Customer</div>
                        <div className='sub-title'>
                          New to GoDaddy? Create an account to get started
                          today.
                        </div>
                        <Link to='/account/create' className='right-link'>
                          Create an Account
                        </Link>
                      </div>
                      <div className='dropdown-divider'></div>
                      <div className='control-panel'>
                        <div className='right-title text-muted'>
                          CONTROL PANEL LINKS
                        </div>
                        <a className='right-link'>Manage Domains</a>
                        <a className='right-link'>Manage Website Builder</a>
                        <a className='right-link'>Manage Hosting</a>
                        <a className='right-link'>Manage SSL Certificates</a>
                        <a className='right-link'>Manage Email</a>
                      </div>
                      <div className='dropdown-divider'></div>
                      <div className='inbox'>
                        <div className='right-title text-muted'>
                          INBOX LINKS
                        </div>
                        <a className='right-link'>
                          Sign in to Office 365 Email
                        </a>
                        <a className='right-link'>Sign in to GoDaddy Webmail</a>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='sign-in'>
                        <div className='user-name'>{user.userName}</div>
                        <div className='user-no'>
                          Customer #: {user.customerNumber}
                        </div>
                        <div className='user-pin'>
                          PIN: <a>View</a>
                        </div>
                      </div>
                      <div className='dropdown-divider'></div>
                      <div className='account'>
                        <div className='account-title text-muted'>ACCOUNT</div>
                        <a className='right-link'>My Products</a>
                        <a className='right-link'>Renewals & Billing</a>
                        <Link to='/profile' className='right-link'>
                          My Profile
                        </Link>
                        <Link to='/order' className='right-link'>
                          My Order
                        </Link>
                      </div>
                      <div className='dropdown-divider'></div>
                      <div className='inbox'>
                        <a className='right-link'>
                          Sign in to Office 365 Email
                        </a>
                        <a className='right-link'>Sign in to GoDaddy Webmail</a>
                      </div>
                      <div className='dropdown-divider'></div>
                      <Link to='/logout' className='right-link mt-4'>
                        Sign Out
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            {page === "cart" ? null : (
              <div className='cart ms-4'>
                <Link
                  to={`/cart`}
                  className='d-flex text-black text-decoration-none'
                >
                  <img
                    className='cart-image pe-1'
                    src='https://drive.google.com/uc?export=view&id=12UVwUy5O4EE6yrFNZIj8Cl_4S1-0lbto'
                    alt='cart'
                  />
                  <span className='d-none d-lg-flex'>
                    {cart.length > 0 && `Checkout Now`}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
