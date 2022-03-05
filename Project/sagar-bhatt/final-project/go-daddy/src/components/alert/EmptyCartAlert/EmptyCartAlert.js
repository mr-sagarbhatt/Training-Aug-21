import "./empty-cart-alert.scss";
import { FaTimes } from "react-icons/fa";

const EmptyCartAlert = ({ alertMsg, fnDeleteUserCart, hideEmptyCartAlert }) => {
  return (
    <div className='empty-cart-alert'>
      <section className='alert-card'>
        <div className='alert-card-header' onClick={hideEmptyCartAlert}>
          {<FaTimes></FaTimes>}
        </div>
        <div className='alert-card-body'>
          <div className='alert-card-msg'>{alertMsg}</div>
          <div className='alert-card-buttons'>
            <button className='btn btn-light' onClick={hideEmptyCartAlert}>
              Cancel
            </button>
            <button className='btn btn-dark' onClick={fnDeleteUserCart}>
              Confirm
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmptyCartAlert;
