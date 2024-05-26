import { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";
import Loading from "../components/Loading";
import RecipeCard2 from "../components/RecipeCard2";
import useDebounce from "../utils/useDebounce";
import { countries } from "countries-list";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const countryOptions = Object.keys(countries).map((code) => ({
    code,
    name: countries[code].name,
  }));
  const doSearch = useDebounce(async (searchTerm) => {
    try {
      setLoading(true);
      setSearch(searchTerm);
      setLoading(false);
    } catch (error) {
      // setError(error.message || error);
      console.error("Error fetching data:", error);
      setLoading(false);
    }

    console.log(searchTerm);
  }, 1000);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    doSearch(value);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/recipes/all", {
          params: {
            page,
            limit: 10,
            // category,
            // country,
            // search,
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
      } finally {
        setLoading(false);
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
  }, [hasMore, page]);

  if (loading) {
    return <Loading />;
  }

  const filteredRecipes = recipes.filter((rec) => {
    const searchMatch =
      search.toLowerCase() === "" ||
      rec.name.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = category === "" || rec.category.includes(category);
    const countryMatch = country === "" || rec.country.includes(country);
    return searchMatch && categoryMatch && countryMatch;
  });

  return (
    <>
      <main>
        <section className="container py-8">
          <div>
            <h3 className="font-semibold text-xl">All Recipes</h3>

            <div className="my-4 flex w-full items-center justify-between gap-5">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search by title"
                  value={query}
                  onChange={handleChange}
                  className="w-full bg-transparent p-2 text-base text-black outline-none  border border-red-400 rounded-lg focus:ring focus:ring-red-500"
                />
              </div>
              <div className="w-full flex justify-between ">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full mr-3  p-3 bg-[#dfe2e7] border rounded-md focus:outline-none  border-white/20 focus:border-red-500 `}
                >
                  <option value="">Select Category</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                  <option value="dessert">Dessert</option>
                </select>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`w-full  p-3 bg-[#dfe2e7] border rounded-md focus:outline-none  border-white/20 focus:border-red-500 `}
                >
                  <option value="">Select Country</option>
                  {countryOptions.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="container">
              <div className="grid grid-cols-1  gap-4">
                <div className="space-y-3 md:col-span-5">
                  {/* Display filtered recipes */}
                  {filteredRecipes.map((recipe) => (
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
          </div>
        </section>
      </main>
    </>
  );
};

export default AllRecipes;
