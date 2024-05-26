/* eslint-disable react/prop-types */

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../utils/axios";

const RecipeCard2 = ({ recipe }) => {
  // console.log(recipe);
  const { country, creatorEmail, image, name, purchased_by } = recipe;
  const { user, setReFetchMe } = useAuth();
  const navigate = useNavigate();

  const handleViewRecipe = (recipe) => {
    if (!user) {
      toast.error("Please login to view the recipe");
      //   navigate("/");
    } else {
      if (recipe.creatorEmail === user.email) {
        navigate(`/recipe/${recipe._id}`);
      } else if (recipe.purchased_by.includes(user.email)) {
        navigate(`/recipe/${recipe._id}`);
      } else if (user.coin < 10) {
        toast.error("Not enough coins. Please purchase more");
        navigate(`/pruchase-coins`);
      } else {
        const confirmation = window.confirm(
          "Do you want to spend 10 coins to view this recipe?"
        );
        if (confirmation) {
          const data = {
            buyerUser: user._id,
            creatorEmail: recipe.creatorEmail,
            recipeId: recipe._id,
          };
          const purcheseRecipe = async () => {
            const response = await axios.post("/recipes/purchase", data);
            console.log(response);
            setReFetchMe(true);
            if (response.status === 200) {
              setReFetchMe(true);
              navigate(`/recipe/${recipe._id}`);
            }
          };
          purcheseRecipe();
        }
      }
    }
  };
  return (
    <div className="blog-card">
      <img className="blog-thumb" src={image} alt="Blog Thumbnail" />
      <div className="mt-2 relative">
        <h3 className="text-slate-900 font-semibold text-xl lg:text-2xl">
          {name}
        </h3>

        <p className="mb-6 text-base text-slate-500 mt-1">
          {purchased_by?.length ? (
            purchased_by.map((p) => `Purchased By : ${p}`)
          ) : (
            <p>No one has purchased this recipe yet</p>
          )}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img text-slate-700 font-semibold">
              <span className="lowercase"> {creatorEmail} </span>
            </div>
            <div>
              <h5 className="text-slate-800 text-sm">{country}</h5>
            </div>
          </div>
          <div className="text-sm px-2 py-1 text-slate-700">
            <button
              onClick={() => handleViewRecipe(recipe)}
              className="py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center"
            >
              <span>View The Recipe</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard2;
