import "./cart-header.scss";
import Icon from "../../../../assets/images/svg/GoDaddy-Icon-Black-Logo.wine.svg";
import Logo from "../../../../assets/images/svg/GoDaddy-Black-Logo.wine.svg";
import { Link } from "react-router-dom";

const CartHeader = () => {
  return (
    //   <!-- header -->
    <div className='cart-header'>
      {/* <!-- logo --> */}
      <div className='logo-container'>
        <Link to='/'>
          <img
            className='icon'
            src={Icon}
            alt='logo'
            height='48px'
            width='50px'
          />
          <img
            className='logo'
            src={Logo}
            alt='logo'
            height='35px'
            width='166px'
          />
          <span className='country-name d-none'>India</span>
        </Link>
      </div>
      {/* <!-- contact-us --> */}
    </div>
  );
};

export default CartHeader;
