import Logo from "../assets/images/svg/GoDaddy-Black-Logo.wine.svg";
import {
  createUserOrder,
  razorpayVerifyPayment,
} from "../services/OrderService";

const openPayModal = async (razorpay) => {
  try {
    const { userName, userEmail, primaryPhone } = razorpay;
    // *********** CREATING NEW ORDER ***********
    const result = await createUserOrder();
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    let { orderNo } = result.data;
    let { amount, id: order_id, currency } = result.data.razorpayOrder;

    // *********** RAZORPAY OPTIONS ***********
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount.toString(),
      currency,
      name: "GoDaddy",
      description: "GoDaddy Payment",
      image: { Logo },
      order_id,
      handler: async function (response) {
        console.log(response);
        amount /= 100;
        const data = {
          transactionId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          orderNo,
          amount,
          currency,
        };
        // *********** CREATING NEW PAYMENT ***********
        const result = await razorpayVerifyPayment(data);
        console.log(result);
      },
      prefill: {
        name: userName,
        contact: primaryPhone || "9999999999",
        email: userEmail,
      },
      notes: {
        address: "some address",
      },
      theme: {
        color: "#00a4a6",
      },
    };
    // *********** RAZORPAY MODAL ***********
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (err) {
    console.log(err.response.data.message || err.message || err);
  }
};

export default openPayModal;
