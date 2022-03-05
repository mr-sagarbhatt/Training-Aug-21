import "./error-card.scss";
import { Link } from "react-router-dom";

const ErrorCard = () => {
  return (
    <section className='error-page'>
      <h1 className='error-page-header'>Dang.</h1>
      <p className='error-page-body'>
        No page found. Sorry about that, let's keep you moving.
      </p>
      <div className='error-page-footer'>
        <Link className='text-dark' to='/'>
          Home
        </Link>
        <Link className='text-dark' to='/profile'>
          My Profile
        </Link>
        <Link className='text-dark' to='/cart'>
          My Cart
        </Link>
      </div>
    </section>
  );
};

export default ErrorCard;
