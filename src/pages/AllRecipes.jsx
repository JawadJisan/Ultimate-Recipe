import { useEffect, useRef, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "../utils/axios";
import Loading from "../components/Loading";
import RecipeCard2 from "../components/RecipeCard2";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [search, setSearch] = useState("");
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/recipes/all", {
          params: {
            page,
            limit: 10,
            category,
            country,
            search,
          },
        });

        const newRecipes = response.data.recipes;

        if (newRecipes.length === 0) {
          setHasMore(false);
        } else {
          setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setHasMore(false);
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const loaderItem = entries[0];
        if (loaderItem.isIntersecting && hasMore) {
          fetchRecipes();
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, page, category, country, search]);

  return (
    <>
      <main>
        <section className="container py-8">
          <div>
            <h3 className="font-semibold text-xl">All Recipes</h3>

            <div className="my-4">
              <input
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 border rounded"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border rounded ml-2"
              >
                <option value="">All Categories</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
              </select>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="p-2 border rounded ml-2"
              >
                <option value="">All Countries</option>
                <option value="country1">Country 1</option>
                <option value="country2">Country 2</option>
              </select>
            </div>

            <div className="container">
              <div className="grid grid-cols-1  gap-4">
                <div className="space-y-3 md:col-span-5">
                  {recipes.map((recipe) => (
                    <RecipeCard2 key={recipe._id} recipe={recipe} />
                  ))}
                </div>
              </div>
            </div>

            {hasMore && (
              <div ref={loaderRef} className="text-center">
                <Loading />
              </div>
            )}
            {!hasMore && (
              <div className="text-center font-bold text-xl text-green-900">
                No more recipes to load.
              </div>
            )}

            {/* <div className="grid grid-cols-1 my-8 justify-items-center">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
              {hasMore && (
                <div ref={loaderRef} className="text-center">
                  <Loading />
                </div>
              )}
              {!hasMore && (
                <div className="text-center font-bold text-xl text-green-900">
                  No more recipes to load.
                </div>
              )}
            </div> */}
          </div>
        </section>
      </main>
    </>
  );
};

export default AllRecipes;
