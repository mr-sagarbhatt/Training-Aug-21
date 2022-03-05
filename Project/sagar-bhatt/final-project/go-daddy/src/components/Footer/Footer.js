import "./footer.scss";
import Logo from "../../assets/images/svg/GoDaddyGuidesLogoWhite.svg";
import Arrow from "../../assets/images/svg/care-arrow.svg";
import WineLogo from "../../assets/images/svg/GoDaddy-White-Logo.wine.svg";
import { Link } from "react-router-dom";

import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='footer'>
      {/* <!-- text-banner --> */}
      <div className='text-banner'>
        <p>Need help? Call our award-winning support team at 040 67607600</p>
      </div>
      {/* <!-- above footer menu --> */}
      <div className='above-footer-menu'>
        <div className='guides-link'>
          <p>We love taking your call.</p>
          <div className='logo'>
            <img className='guides-logo' src={Logo} alt='Logo' />
            <img className='care-arrow' src={Arrow} alt='Logo' />
          </div>
        </div>
      </div>
      {/* <!-- footer menu --> */}
      <nav className='footer-menu'>
        <ul className='menu'>
          <li className='menu-item'>
            <div
              className='heading collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#submenu1'
              aria-expanded='false'
            >
              About GoDaddy
            </div>
            <ul className='submenu collapse' id='submenu1'>
              <li>
                <a href='#'>About Us</a>
              </li>
              <li>
                <a href='#'>Contact Us</a>
              </li>
              <li>
                <a href='#'>Newsroom</a>
              </li>
              <li>
                <a href='#'>Investor Relations</a>
              </li>
              <li>
                <a href='#'>Annual Returns</a>
              </li>
              <li>
                <a href='#'>Corporate Social Responsibility</a>
              </li>
              <li>
                <a href='#'>Careers</a>
              </li>
              <li>
                <a href='#'>Trust Center</a>
              </li>
              <li>
                <a href='#'>Legal</a>
              </li>
              <li>
                <a href='#'>GoDaddy Blog</a>
              </li>
            </ul>
          </li>
          <li className='menu-item'>
            <div
              className='heading collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#submenu2'
              aria-expanded='false'
            >
              Support
            </div>
            <ul className='submenu collapse' id='submenu2'>
              <li>
                <a href='#'>Product Support</a>
              </li>
              <li>
                <a href='#'>Community</a>
              </li>
              <li>
                <a href='#'>Report Abuse</a>
              </li>
              <li>
                <a href='#'>Resources</a>
              </li>
            </ul>
          </li>
          <li className='menu-item'>
            <div
              className='heading collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#submenu3'
              aria-expanded='false'
            >
              Resources
            </div>
            <ul className='submenu collapse' id='submenu3'>
              <li>
                <a href='#'>Webmail</a>
              </li>
              <li>
                <a href='#'>WHOIS</a>
              </li>
              <li>
                <a href='#'>ICANN Confirmation</a>
              </li>
              <li>
                <a href='#'>Designers & Developers</a>
              </li>
              <li>
                <a href='#'>Redeem Code</a>
              </li>
              <li>
                <a href='#'>Product Catalog</a>
              </li>
              <li>
                <a href='#'>Customer Testimonials</a>
              </li>
            </ul>
          </li>
          <li className='menu-item'>
            <div
              className='heading collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#submenu4'
              aria-expanded='false'
            >
              Partner Programs
            </div>
            <ul className='submenu collapse' id='submenu4'>
              <li>
                <a href='#'>Affiliates</a>
              </li>
              <li>
                <a href='#'>Reseller Programs</a>
              </li>
              <li>
                <a href='#'>GoDaddy Pro</a>
              </li>
            </ul>
          </li>
          <li className='menu-item'>
            <div
              className='heading collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#submenu5'
              aria-expanded='false'
            >
              Account
            </div>
            <ul className='submenu collapse' id='submenu5'>
              <li>
                <a href='#'>My Products</a>
              </li>
              <li>
                <a href='#'>Renewals & Billing</a>
              </li>
              <li>
                <a href='#'>Create Account</a>
              </li>
            </ul>
          </li>
          <li className='menu-item'>
            <div
              className='heading collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#submenu6'
              aria-expanded='false'
            >
              Shopping
            </div>
            <ul className='submenu collapse' id='submenu6'>
              <li>
                <a href='#'>Domain Search</a>
              </li>
              <li>
                <a href='#'>Websites</a>
              </li>
              <li>
                <a href='#'>WordPress</a>
              </li>
              <li>
                <a href='#'>Hosting</a>
              </li>
              <li>
                <a href='#'>Web Security</a>
              </li>
              <li>
                <a href='#'>Email & Office</a>
              </li>
              <li>
                <a href='#'>Deals</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {/* <!-- footer-controls --> */}
      <div className='footer-controls'>
        <Link to='/'>
          <div className='logo'>
            <img src={WineLogo} alt='logo' height='35px' width='166px' />
          </div>
        </Link>
        <hr className='hr' />
        <div className='social-media'>
          <FaFacebook className='text-white' size='1.5rem'></FaFacebook>
          <FaInstagramSquare
            className='text-white'
            size='1.5rem'
          ></FaInstagramSquare>
          <FaYoutube className='text-white' size='1.5rem'></FaYoutube>
        </div>
      </div>
      {/* <!-- footer-legal --> */}
      <div className='footer-legal'>
        <nav className='legal-menu'>
          <ul>
            <li>
              <a href='#'>Legal</a>
            </li>
            <li>
              <a href='#'>Privacy Policy</a>
            </li>
            <li>
              <a href='#'>Advertising Preferences</a>
            </li>
            <li>
              <a href='#'>Cookies</a>
            </li>
          </ul>
        </nav>
        <div className='copyright'>
          Copyright © 1999 - 2022 GoDaddy Operating Company, LLC. All Rights
          Reserved. The GoDaddy word mark is a registered trademark of GoDaddy
          Operating Company, LLC in the US and other countries. The “GO” logo is
          a registered trademark of GoDaddy.com, LLC in the US.
        </div>
        <div className='tos'>
          Use of this Site is subject to express terms of use. By using this
          site, you signify that you agree to be bound by these
          <a href='https://in.godaddy.com/legal/agreements/universal-terms-of-service-agreement'>
            Universal Terms of Service.
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
