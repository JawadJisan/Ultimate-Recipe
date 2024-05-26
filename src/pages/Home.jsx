import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SuccessStories from "../components/SuccessStories";
import axios from "../utils/axios";
import DevInfo from "../components/DevInfo";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const Home = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleCLick = () => {
    if (!user) {
      login();
      // navigate("/add-recipe");
    } else {
      navigate("/add-recipe");
    }
  };

  const [recipeCount, setRecipeCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const recipeRes = await axios.get("/recipes/countRecipe");
        const userRes = await axios.get("/users/countUsers");
        setRecipeCount(recipeRes.data.total);
        setUserCount(userRes.data.total);
      } catch (error) {
        console.error("Error fetching counts", error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <>
      <main>
        <section className="container">
          <div className="py-4 bg-[url('./assets/images/cover1.jpg')] rounded-lg p-4 md:p-12 min-h-[450px] bg-cover grid place-items-center grid-cols-12">
            <div className="col-span-12 md:col-span-6">
              <h1 className="font-bold text-3xl md:text-5xl text-white">
                Choose from thousands of recipes
              </h1>
              <p className="text-white my-4">
                Appropriately integrate technically sound value with scalable
                infomediaries negotiate sustainable strategic theme areas
              </p>
              <div className="mt-10">
                <Link to="/all-recipes">
                  <button className="py-2 bg-[#d55f1b] hover:bg-[#cf4c00] mx-4 px-6 rounded-md text-white content-center">
                    See Recipes
                  </button>
                </Link>
                <button
                  onClick={handleCLick}
                  className="py-2 bg-[#eb4a36] hover:bg-[#cf4c00] px-6 rounded-md text-white content-center"
                >
                  Add Recipes
                </button>
              </div>
            </div>
          </div>
        </section>

        <SuccessStories recipeCount={recipeCount} userCount={userCount} />
        <Slider />
        <DevInfo />

        <Footer />
      </main>
    </>
  );
};

export default Home;
