import Logo from "../../assets/images/svg/GoDaddy-Black-Logo.wine.svg";
import { useOrderContext } from "../../contexts/OrderContext";
import { useNavigate } from "react-router-dom";

const RazorpayButton = ({ razorpayValues }) => {
  const { fnCreateUserOrder, fnCreateUserPayment } = useOrderContext();
  const { userName, userEmail, primaryPhone, promoCode } = razorpayValues;
  const navigate = useNavigate();

  const openPayModal = async () => {
    try {
      // *********** CREATING NEW ORDER ***********
      const result = await fnCreateUserOrder(promoCode);
      if (!result) {
        alert("Server error. Are you online?");
        return;
      }
      let { orderNo } = result;
      let { amount, id: order_id, currency } = result.razorpayOrder;

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
          const result = await fnCreateUserPayment(data);
          console.log(result);
          navigate("/");
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

  return (
    <button className='btn btn-dark w-100' onClick={openPayModal}>
      I'm Ready to Pay
    </button>
  );
};

export default RazorpayButton;
