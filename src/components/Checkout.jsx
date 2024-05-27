import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "../utils/axios";

export const CheckoutForm = ({ amount, onSuccess, userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!elements || !stripe) return;
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }
    const {
      data: { clientSecret },
    } = await axios.post("/coins/create-payment-intent", {
      amount: amount * 100,
      currency: "usd",
    });
    console.log(clientSecret);
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // return_url: `http://localhost:5173/success/${amount}`,
        return_url: `https://ultimate-recipe.vercel.app/success/${amount}`,
      },
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log("this block appered");
      //   await axios.post("/api/users/purchase-coins", { coins: amount });
      //   alert("Coins purchased successfully!");
      //   onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="py-2 bg-[#eb4a36] px-6 my-4 rounded-md text-white content-center"
        type="submit"
        disabled={!stripe || !elements}
      >
        Pay
      </button>
      {errorMessage && (
        <div className="text-center my-3 text-red-500 font-semibold">
          {errorMessage}
        </div>
      )}
    </form>
  );
};
