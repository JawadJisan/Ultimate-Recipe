import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const RecipeDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [hasReacted, setHasReacted] = useState(false);

  const { user } = useAuth();

  console.log(recipe);

  // const isFavourite =
  console.log(hasReacted);

  useEffect(() => {
    const fetRecipeDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/recipes/${id}`);
        // console.log(response);
        if (response.status === 200) {
          setRecipe(response.data.recipe);
          setHasReacted(response.data.recipe.reactions.includes(user?._id));
          const suggestionRes = await axios.get(`/recipes/suggestions`, {
            params: {
              category: response.data.recipe.category,
              country: response.data.recipe.country,
            },
          });
          setSuggestions(suggestionRes.data.suggestions);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetRecipeDetails();
  }, [id, user?._id]);

  const handleReaction = async () => {
    try {
      const url = hasReacted
        ? "/recipes/removeReaction"
        : "/recipes/addReaction";
      const response = await axios.post(url, {
        recipeId: id,
        userId: user?._id,
      });
      console.log(response);
      if (response.status === 200) {
        setHasReacted(!hasReacted);
        setRecipe((prev) => ({
          ...prev,
          reactions: response.data.reactions,
        }));
        if (hasReacted) {
          toast.error("Removed from Favourite");
        } else {
          toast.success("Addd to Favourite");
        }
      }
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      {recipe && (
        <main>
          <section>
            <div className="grid grid-cols-12 container gap-8 justify-items-center">
              <div className="col-span-12 md:col-span-6">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full rounded-lg object-contain"
                />
              </div>
              <div className="col-span-12 md:col-span-6 py-8 flex flex-col justify-center">
                <h2 className="font-semibold text-4xl lg:w-8/12 leading-10">
                  {recipe.name}
                </h2>
                <p className="text-xs text-[#eb4a36] italic my-2">
                  by: {recipe.creatorEmail}
                </p>
                <p className="text-gray-600 text-smleading-6">
                  Category: {recipe.category}
                </p>
                <p className="text-gray-600 text-sm my-6 leading-6">
                  {recipe.details}
                </p>

                <div className="flex gap-4 justify-center divide-x my-12">
                  <div className="flex-1 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                    <h3 className="font-medium text-lg text-gray-700 mt-2">
                      Prep time
                    </h3>
                    <p className="text-gray-500 text-sm">30 minutes</p>
                  </div>
                  <div className="flex-1 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M6.5 17h11" />
                      <path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
                      <path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z" />
                    </svg>
                    <h3 className="font-medium text-lg text-gray-700 mt-2">
                      Cook time
                    </h3>
                    <p className="text-gray-500 text-sm">1 hour</p>
                  </div>
                  <div className="flex-1 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                    </svg>
                    <h3 className="font-medium text-lg text-gray-700 mt-2">
                      Recipe Purchased
                    </h3>
                    <p className="text-[#eb4a36] font-bold text-sm">
                      {recipe.watchCount}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  <div
                    className={`flex gap-2 text-gray-600 cursor-pointer hover:text-[#eb4a36] ${
                      hasReacted ? "text-[#eb4a36]" : ""
                    }`}
                    onClick={handleReaction}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`icon icon-tabler icons-tabler-outline icon-tabler-heart ${
                        hasReacted ? "fill-[#eb4a36] stroke-[#eb4a36]" : "" // Combined fill and stroke
                      }`}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                    </svg>
                    <span>Favourite</span>
                  </div>

                  {/* <div className="flex gap-2 text-gray-600 cursor-pointer hover:text-[#0E79F6]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      <path d="M8.7 10.7l6.6 -3.4" />
                      <path d="M8.7 13.3l6.6 3.4" />
                    </svg>
                    <span>Share</span>
                  </div> */}
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="grid grid-cols-12 container gap-8 justify-items-center">
              <div className="col-span-12 w-full md:w-1/2">
                <iframe
                  width="100%"
                  className="aspect-video"
                  title={recipe.name}
                  src={`https://www.youtube.com/embed/${recipe.videoCode}`}
                  frameBorder=""
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>

          <section>
            <div className="container py-12">
              <div className="step">
                <h3>Recipe You May Like</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center">
                  {suggestions?.length > 0 ? (
                    suggestions.map((sug) => (
                      <RecipeCard sug={sug} key={sug._id} />
                    ))
                  ) : (
                    <p>
                      No Suggest Recipe Found Using This Category and Country
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default RecipeDetails;
