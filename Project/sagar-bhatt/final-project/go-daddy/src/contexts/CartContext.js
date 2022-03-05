import { createContext, useContext, useState, useEffect } from "react";
import {
  getUserCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  deleteUserCart,
} from "../services/CartService";
import { useAuthContext } from "./AuthContext";
import { useProductContext } from "./ProductContext";
import { useDiscountContext } from "./DiscountContext";

import { lsSetCart, lsGetCart, lsRemoveCart } from "../utils/local-storage";

// *********** CONTEXT ***********
const CartContext = createContext();

const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartError, setCartError] = useState({});
  const [cartLoader, setCartLoader] = useState(false);
  const { user } = useAuthContext();
  const { products } = useProductContext();
  const { discount } = useDiscountContext();

  // const { discountLoader, discount } = useDiscountContext();
  // const { promoLoader, promo } = usePromoContext();
  let [totalPrice, setTotalPrice] = useState(0);
  let [totalUpdatePrice, setTotalUpdatePrice] = useState(0);
  let [totalSavings, setTotalSavings] = useState(0);
  const [userPromoCode, setUserPromoCode] = useState("");
  const [promoCode, setPromoCode] = useState({});

  const handleDiscount = (e, cartItem) => {
    const discountId = e.target.value;
    if (Object.keys(user).length > 0) {
      fnUpdateCartItem(cartItem._id, { discountId });
    } else {
      fnUpdateCartItem(cartItem.productId._id, { discountId });
    }
    fnGetUserCart();
  };

  const renewsOn = (date, months) => {
    const startTime = new Date(date);
    const currentMonth = startTime.getMonth();
    return new Date(new Date(date).setMonth(currentMonth + months));
  };

  useEffect(() => {
    // * TOTAL PRICE
    const userTotalPrice = cart?.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    setTotalPrice(userTotalPrice);
    // * SUBTOTAL PRICE
    const userTotalUpdatePrice = cart?.reduce((acc, item) => {
      return acc + item.updatedPrice;
    }, 0);
    setTotalUpdatePrice(userTotalUpdatePrice);
    // * TOTAL SAVINGS
    const userTotalSavings = userTotalPrice - userTotalUpdatePrice;
    setTotalSavings(userTotalSavings);
  }, [cart]);

  useEffect(() => {
    // * TOTAL PROMO SAVINGS
    const userTotalUpdatePrice = totalUpdatePrice - (promoCode?.amount || 0);
    setTotalUpdatePrice(userTotalUpdatePrice);
    const userTotalSavings = totalSavings + (promoCode?.amount || 0);
    setTotalSavings(userTotalSavings);
    // totalUpdatePrice -= promoCode.amount;
  }, [promoCode]);

  // * RAZORPAY
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const razorpayValues = {
    userName: user.userName,
    userEmail: user.email,
    primaryPhone: user.profile?.primaryPhone,
    promoCode: promoCode.promoCode,
  };

  // *********** CART CRUD METHODS ***********
  // * GET USER CART *
  const fnGetUserCart = async () => {
    try {
      setCartLoader(true);
      if (Object.keys(user).length > 0) {
        //  * SET PRODUCTS *
        const localCart = lsGetCart();
        if (localCart?.length > 0) {
          //  * ADD TO CART *
          localCart?.map(async (item) => {
            await addToCart({
              productId: item.productId._id,
              discountId: item.discountId._id,
            });
            // setCart([...cart, cartItem.data]);
            console.log(cart);
          });
        }
        setCartError({});
        lsRemoveCart();

        //  * GET PRODUCTS *
        const userCart = await getUserCart();
        if (userCart?.data.length > 0) {
          setCart(userCart.data);
        } else {
          setCart([]);
        }
      } else {
        //  * GET PRODUCTS *
        const userCart = lsGetCart();
        //  * SET PRODUCTS *
        if (userCart?.length > 0) {
          setCart(userCart);
        } else {
          setCart([]);
        }
      }
      setCartLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setCartLoader(false);
    }
  };

  useEffect(() => {
    fnGetUserCart();
  }, [user]);

  // * ADD TO CART *
  const fnAddToCart = async (cartData) => {
    try {
      setCartLoader(true);
      if (Object.keys(user).length > 0) {
        //  * ADD TO CART *
        const userCart = await addToCart(cartData);
        setCart([...cart, userCart]);
      } else {
        //  * ADD TO CART *
        const productId = products.find(
          (item) => item._id === cartData.productId
        );
        const item = cart.filter(
          (item) => item.productId._id === productId._id
        );
        if (item.length > 0) {
          setCartError({ message: `Product is already added in your cart!` });
        } else {
          const discountId = discount.find(
            (item) => (item.productId = productId._id)
          );
          const totalValue = productId.price * discountId.months;
          const discountValue = (totalValue * discountId.percentage) / 100;
          const updatedValue = totalValue - discountValue;
          const data = {
            productId,
            price: totalValue,
            updatedPrice: updatedValue,
            discountId,
          };
          lsSetCart([...cart, data]);
          setCart([...cart, data]);
        }
      }
      setCartLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setCartError({ message: `Product is already added in your cart!` });
      setCartLoader(false);
    }
  };

  // * DELETE USER CART :: empty cart *
  const fnDeleteUserCart = async () => {
    try {
      setCartLoader(true);
      if (Object.keys(user).length > 0) {
        const userCart = await deleteUserCart();
        setCart([]);
      } else {
        lsRemoveCart();
        setCart([]);
      }
      setCartLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setCartLoader(false);
    }
  };

  // * DELETE CART ITEM  *
  const fnDeleteCartItem = async (_id) => {
    try {
      setCartLoader(true);
      if (Object.keys(user).length > 0) {
        const userCart = await deleteCartItem(_id);
        const newCart = cart.filter((cartItem) => cartItem._id !== _id);
        setCart(newCart);
      } else {
        const newCart = cart.filter(
          (cartItem) => cartItem.productId._id !== _id
        );
        lsSetCart(newCart);
        setCart(newCart);
      }
      setCartLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setCartLoader(false);
    }
  };

  // * UPDATE CART ITEM  *
  const fnUpdateCartItem = async (id, cartData) => {
    try {
      setCartLoader(true);
      if (Object.keys(user).length > 0) {
        const userCart = await updateCartItem(id, cartData);
        if (userCart) {
          fnGetUserCart();
        }
      } else {
        const productId = products.find((product) => product._id === id);
        const discountId = discount.find(
          (item) => item._id == cartData.discountId
        );
        const totalValue = productId.price * discountId.months;
        const discountValue = (totalValue * discountId.percentage) / 100;
        const updatedValue = totalValue - discountValue;
        const data = {
          productId,
          price: totalValue,
          updatedPrice: updatedValue,
          discountId,
        };
        const index = cart.findIndex(
          (cartItem) => cartItem.productId._id === id
        );
        // lsSetCart([cartProduct]);
        // setCart([cartProduct]);
        cart[index] = data;
        setCart([...cart]);
        lsSetCart([...cart]);
        fnGetUserCart();
      }
      setCartLoader(false);
    } catch (err) {
      console.log(err.response.data.message || err.message);
      setCartLoader(false);
    }
  };

  const value = {
    cartLoader,
    cart,
    cartError,
    fnAddToCart,
    fnGetUserCart,
    fnDeleteUserCart,
    fnDeleteCartItem,
    fnUpdateCartItem,

    // discount,
    // discountLoader,
    // promoLoader,
    totalPrice,
    totalUpdatePrice,
    totalSavings,
    userPromoCode,
    // promo,
    promoCode,

    setTotalUpdatePrice,
    setTotalSavings,
    setUserPromoCode,
    setPromoCode,

    handleDiscount,
    renewsOn,
    razorpayValues,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider, useCartContext };
