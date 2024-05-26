import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const AddRecipe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("image", {
        type: "manual",
        message: "Error uploading image",
      });
      return null;
    }
  };

  const submitForm = async (formData) => {
    try {
      const imgUrl = await uploadImage(formData.image[0]);
      if (!imgUrl) {
        return;
      }

      const recipeData = {
        name: formData.name,
        image: imgUrl,
        details: formData.details,
        videoCode: formData.videoUrl,
        country: formData.country,
        category: formData.category,
        creatorEmail: user.email,
      };

      console.log(recipeData);

      const response = await axios.post("/recipes/add", recipeData);

      if (response.status === 201) {
        navigate("/all-recipes");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      setError("root.random", {
        type: "manual",
        message: `Something went wrong: ${error.message}`,
      });
    }
  };

  return (
    <>
      <main>
        <section className="container">
          <div className="w-full md:w-1/2 mx-auto bg-[#f1f1f5] p-8 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Add Recipe</h2>
            <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2">
                  Recipe Name
                </label>
                <input
                  {...register("name", { required: "Recipe Name is Required" })}
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full p-3 bg-[#9c9ca1] border rounded-md focus:outline-none ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/20 focus:border-indigo-500"
                  }`}
                />
                {!!errors.name && (
                  <div role="alert" className="text-red-600">
                    {errors.name.message}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="details" className="block mb-2">
                  Recipe Details
                </label>
                <textarea
                  {...register("details", {
                    required: "Recipe Details are Required",
                  })}
                  id="details"
                  name="details"
                  className={`w-full p-3 bg-[#9c9ca1] border rounded-md focus:outline-none ${
                    errors.details
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/20 focus:border-indigo-500"
                  }`}
                ></textarea>
                {!!errors.details && (
                  <div role="alert" className="text-red-600">
                    {errors.details.message}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="videoUrl" className="block mb-2">
                  Embedded YouTube Video Code
                  <br />
                  (Only Video ID)
                </label>
                <input
                  {...register("videoUrl", {
                    required: "Give Valid Youtube Video ID",
                  })}
                  type="text"
                  id="videoUrl"
                  name="videoUrl"
                  // placeholder=""
                  className={`w-full p-3 bg-[#9c9ca1] border rounded-md focus:outline-none ${
                    errors.videoUrl
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/20 focus:border-indigo-500"
                  }`}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="country" className="block mb-2">
                  Country
                </label>
                <input
                  {...register("country", { required: "Country is Required" })}
                  type="text"
                  id="country"
                  name="country"
                  className={`w-full p-3 bg-[#9c9ca1] border rounded-md focus:outline-none ${
                    errors.country
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/20 focus:border-indigo-500"
                  }`}
                />
                {!!errors.country && (
                  <div role="alert" className="text-red-600">
                    {errors.country.message}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="category" className="block mb-2">
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is Required",
                  })}
                  id="category"
                  name="category"
                  className={`w-full p-3 bg-[#9c9ca1] border rounded-md focus:outline-none ${
                    errors.category
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/20 focus:border-indigo-500"
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                  <option value="dessert">Dessert</option>
                </select>
                {!!errors.category && (
                  <div role="alert" className="text-red-600">
                    {errors.category.message}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="image" className="block mb-2">
                  Recipe Image
                </label>
                <input
                  {...register("image", {
                    required: "Recipe Image is Required",
                  })}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className={`w-full p-3 bg-[#9c9ca1] border rounded-md focus:outline-none ${
                    errors.image
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/20 focus:border-indigo-500"
                  }`}
                />
                {!!errors.image && (
                  <div role="alert" className="text-red-600">
                    {errors.image.message}
                  </div>
                )}
              </div>
              <p>{errors?.root?.random?.message}</p>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full  text-white p-3 rounded-md hover:bg-[#ee2a0f] cBG transition-all duration-200"
                >
                  Add Recipe
                </button>
              </div>
              {/* <p className="text-center">
                <Link to="/recipes" className="text-indigo-600 hover:underline">
                  Back to Recipes
                </Link>
              </p> */}
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default AddRecipe;
