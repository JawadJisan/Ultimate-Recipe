import { useEffect } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const { user, fetchUserData } = useAuth();
  const { amount } = useParams();
  const navigate = useNavigate();
  console.log(amount, "amount from success");

  useEffect(() => {
    const updateCoins = async () => {
      try {
        if (user?._id) {
          const res = await axios.post("/coins/buy", {
            amount: Number(amount),
            userId: user?._id,
          });
          if (res.status == 200) {
            toast.success("Successfully Purchased Coin");
            fetchUserData();
            navigate("/all-recipes");
          }
        }
      } catch (error) {
        console.error("Error updating coins", error);
      }
    };
    updateCoins();
  }, [amount, user, navigate, fetchUserData]);

  return (
    <div className="grid place-items-center ">
      <h1 className="text-2xl my-10">Payment Successful</h1>
      <p className="text-xl">Redirecting...</p>
    </div>
  );
};
export default Success;
