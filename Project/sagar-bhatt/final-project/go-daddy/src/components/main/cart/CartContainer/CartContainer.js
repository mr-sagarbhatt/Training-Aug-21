import "./cart-container.scss";
import Icon from "../../../../assets/images/svg/GoDaddy-Icon-Black-Logo.wine.svg";
import { FaTrashAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useCartContext } from "../../../../contexts/CartContext";
import { useDiscountContext } from "../../../../contexts/DiscountContext";
import { usePromoContext } from "../../../../contexts/PromoContext";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "../../../alert/ErrorAlert/ErrorAlert";
import { useAuthContext } from "../../../../contexts/AuthContext";
import RazorpayButton from "../../../RazorpayButton/RazorpayButton";
import PageLoader from "../../../Loader/PageLoader";
import EmptyCartAlert from "../../../alert/EmptyCartAlert/EmptyCartAlert";

const CartContainer = () => {
  const navigate = useNavigate();
  const showPromoRef = useRef(null);
  const hidePromoRef = useRef(null);
  const promoRef = useRef(null);
  const promoError = useRef(null);
  const emptyCartAlert = useRef(null);

  const { authLoader, user } = useAuthContext();
  const {
    cartLoader,
    cart,
    cartError,
    fnGetUserCart,
    fnDeleteUserCart,
    fnDeleteCartItem,
    fnUpdateCartItem,
    totalUpdatePrice,
    totalSavings,
    userPromoCode,
    promoCode,
    setTotalUpdatePrice,
    setTotalSavings,
    setUserPromoCode,
    setPromoCode,
    handleDiscount,
    renewsOn,
    razorpayValues,
  } = useCartContext();
  const { discountLoader, discount } = useDiscountContext();
  const { promoLoader, promo } = usePromoContext();

  const showPromo = () => {
    promoRef.current.style.display = "flex";
  };
  const hidePromo = () => {
    promoRef.current.style.display = "none";
  };

  // * HANDLE PROMO CODE
  const handlePromoCode = () => {
    const code = promo.find((promo) => promo.promoCode === userPromoCode);
    if (code) {
      promoError.current.style.display = "none";
      setPromoCode(code);
    } else {
      promoError.current.style.display = "flex";
      setPromoCode({});
    }
  };

  const showEmptyCartAlert = () => {
    emptyCartAlert.current.style.display = "block";
  };
  const hideEmptyCartAlert = () => {
    emptyCartAlert.current.style.display = "none";
  };

  return (
    //   <!-- root -->
    <>
      {authLoader && cartLoader && discountLoader && promoLoader ? (
        <PageLoader></PageLoader>
      ) : (
        <div className='user-cart'>
          <div className='container'>
            <div className='cart-main'>
              {/* <!-- title --> */}
              <div className='cart-title'>Your Items</div>
              {/* <!-- cart-card --> */}
              {Object.keys(cartError).length > 0 && (
                <ErrorAlert error={cartError.message} />
              )}
              {cart.length > 0 ? (
                <>
                  {cart.map((cartItem) => (
                    <div className='cart-card'>
                      <div className='cart-header'>
                        {cartItem.productId.name}
                      </div>
                      <div className='cart-body'>
                        <div className='cart-select'>
                          <select
                            className='form-select'
                            value={cartItem.discountId._id}
                            onChange={(e) => handleDiscount(e, cartItem)}
                          >
                            {discount
                              .filter(
                                (discountItem) =>
                                  discountItem.productId._id ===
                                  cartItem.productId._id
                              )
                              .map((discountItem) => (
                                <option value={discountItem._id}>
                                  {discountItem.months} Months
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className='cart-price'>
                          <span className='fs-6'>
                            &#x20B9;{cartItem.updatedPrice.toFixed(2)}
                          </span>
                          <s className='text-black fw-normal'>
                            &#x20B9;{cartItem.price.toFixed(2)}
                          </s>
                          <span className='fw-normal'>
                            {cartItem.discountId.percentage}% off
                          </span>
                        </div>
                      </div>
                      <div className='cart-footer'>
                        <div className='cart-renewal text-muted'>
                          Renews on{" "}
                          {renewsOn(
                            cartItem.createdAt,
                            cartItem.discountId.months
                          ).toDateString()}
                        </div>
                        {Object.keys(user).length > 0 ? (
                          <div
                            className='cart-delete'
                            onClick={() => fnDeleteCartItem(cartItem._id)}
                          >
                            <FaTrashAlt></FaTrashAlt>
                          </div>
                        ) : (
                          <div
                            className='cart-delete'
                            onClick={() =>
                              fnDeleteCartItem(cartItem.productId._id)
                            }
                          >
                            <FaTrashAlt></FaTrashAlt>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className='below-card'>
                    <button className='cart-btn text-muted fw-normal text-decoration-underline'>
                      View offer disclaimers
                    </button>
                    <button
                      className='cart-btn fs-6'
                      onClick={showEmptyCartAlert}
                    >
                      <FaTrashAlt></FaTrashAlt>
                      <span className='text-decoration-underline fw-bold'>
                        Empty Cart
                      </span>
                    </button>
                  </div>
                  <div style={{ display: "none" }} ref={emptyCartAlert}>
                    <EmptyCartAlert
                      alertMsg={`Are you sure you want to empty your cart? You can't undo this.`}
                      fnDeleteUserCart={fnDeleteUserCart}
                      hideEmptyCartAlert={hideEmptyCartAlert}
                    ></EmptyCartAlert>
                  </div>
                  <hr />
                  <div className='subtotal'>
                    <span className='subtotal-text'>
                      Subtotal <span className='currency'>(INR)</span>
                    </span>
                    <span className='subtotal-price'>
                      &#x20B9;{totalUpdatePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className='promo-code'>
                    <button
                      className='cart-btn fs-6 text-decoration-underline'
                      ref={showPromoRef}
                      onClick={showPromo}
                    >
                      Have a promo code?
                    </button>
                    <div className='promo-code-input' ref={promoRef}>
                      <div className='input-group'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Enter a promo code'
                          value={userPromoCode}
                          onChange={(e) => setUserPromoCode(e.target.value)}
                        />
                        <span
                          className='input-group-text search-icon px-md-5'
                          onClick={handlePromoCode}
                        >
                          Apply
                        </span>
                      </div>
                      <div
                        className='hide-input'
                        ref={hidePromoRef}
                        onClick={hidePromo}
                      >
                        <FaTimes></FaTimes>
                      </div>
                    </div>
                    {Object.keys(promoCode).length > 0 ? (
                      <>
                        <div className='user-promo'>
                          <span className=' pe-1'>{promoCode.promoCode}</span>
                          <span
                            className='text-black mt-1'
                            onClick={() => {
                              setUserPromoCode("");
                              setPromoCode({});
                              setTotalUpdatePrice(
                                totalUpdatePrice + promoCode.amount
                              );
                              setTotalSavings(totalSavings - promoCode.amount);
                            }}
                          >
                            <FaTrashAlt></FaTrashAlt>
                          </span>
                        </div>
                        <div>
                          You saved &#x20B9;{promoCode.amount.toFixed(2)} with
                          promo code.
                        </div>
                      </>
                    ) : (
                      <div className='text-danger d-none' ref={promoError}>
                        Invalid Promo Code.
                      </div>
                    )}
                  </div>
                  <hr />
                  <div className='order-btn'>
                    <div className='above-btn'>
                      <img
                        className='icon mb-1'
                        src={Icon}
                        alt='logo'
                        height='70px'
                        width='25px'
                      />
                      <span className='fw-bold'>Nice!</span>
                      You saved &#x20B9;{totalSavings.toFixed(2)} on your order.
                    </div>
                    {Object.keys(user).length > 0 ? (
                      <RazorpayButton
                        razorpayValues={razorpayValues}
                      ></RazorpayButton>
                    ) : (
                      <Link to='/login' className='btn btn-dark w-100'>
                        Sign In to Pay
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <div className='no-cart-items'>
                  <div className='p-4'>
                    <div className='logo'>
                      <img
                        src='https://drive.google.com/uc?export=view&id=12UVwUy5O4EE6yrFNZIj8Cl_4S1-0lbto'
                        alt='cart'
                        height='83px'
                        width='69px'
                      />
                    </div>
                    <div className='text text-muted fs-4'>
                      There are no items in your basket
                    </div>
                    <Link to='/' className='link fw-bold'>
                      Keep Shopping
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {/* <!-- basket --> */}
          </div>
        </div>
      )}
    </>
  );
};

export default CartContainer;
