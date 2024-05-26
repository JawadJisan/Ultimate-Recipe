import React, { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import coin1 from "../assets/images/coin.jpg";
import coin2 from "../assets/images/coin1.jpg";
import coin3 from "../assets/images/coin2.png";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../components/Checkout";
import Modal from "../components/Modal.jsx"; // You need to create this component

const stripePromise = loadStripe(
  "pk_test_51L0l3aDIahaKXnTeiATjHgffljac8OyDTEMyVn0KIsKESv0LjifHOm5c2Y8vcXyhHSvzEZB265lqIC87Cgij288F00cYoKwWBs"
);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const PurchaseCoins = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handlePurchase = async (amount) => {
    setSelectedAmount(amount);
    setShowModal(true);
  };

  //   console.log(user)

  return (
    <>
      <div className="container py-12">
        <div className="step">
          <h3>Purchase Coins</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 justify-items-center">
            <div className="card">
              <img
                src={coin3}
                className="rounded-md w-[300px] h-[300px]"
                alt=""
              />
              <h4 className="my-2 text-xl">
                <span className=" text-[#eb4a36] font-bold">100</span> coins for{" "}
                <span className=" bg-[#eb4a36] p-1 rounded-lg text-white font-bold">
                  $1
                </span>{" "}
              </h4>
              <div className="py-2 flex justify-center items-center gap-2 text-xs text-gray-500">
                <button
                  onClick={() => handlePurchase(1)}
                  className="py-2 bg-[#eb4a36] w-3/4 px-6 rounded-md text-white content-center"
                >
                  BUY
                </button>
              </div>
            </div>
            <div className="card">
              <img
                src={coin2}
                className="rounded-md w-[300px] h-[300px]"
                alt=""
              />
              <h4 className="my-2 text-xl">
                <span className=" text-[#eb4a36] font-bold">500</span> coins for{" "}
                <span className=" bg-[#eb4a36] p-1 rounded-lg text-white font-bold">
                  $5
                </span>{" "}
              </h4>
              <div className="py-2 flex justify-center items-center gap-2 text-xs text-gray-500">
                <button
                  onClick={() => handlePurchase(5)}
                  className="py-2 bg-[#eb4a36] w-3/4 px-6 rounded-md text-white content-center"
                >
                  BUY
                </button>
              </div>
            </div>
            <div className="card">
              <img
                src={coin1}
                className="rounded-md w-[300px] h-[300px]"
                alt=""
              />
              <h4 className="my-2 text-xl">
                <span className=" text-[#eb4a36] font-bold">1000</span> coins
                for{" "}
                <span className=" bg-[#eb4a36] p-1 rounded-lg text-white font-bold">
                  $10
                </span>{" "}
              </h4>
              <div className="py-2 flex justify-center items-center gap-2 text-xs text-gray-500">
                <button
                  onClick={() => handlePurchase(10)}
                  className="py-2 bg-[#eb4a36] w-3/4 px-6 rounded-md text-white content-center"
                >
                  BUY
                </button>
              </div>
            </div>
          </div>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm
                  userId={user._id}
                  amount={selectedAmount}
                  onSuccess={() => setShowModal(false)}
                />
              </Elements>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default PurchaseCoins;
