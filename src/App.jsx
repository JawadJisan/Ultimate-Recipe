import "./App.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import Loading from "./components/Loading";
import AllRecipes from "./pages/AllRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/all-recipes" element={<AllRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />

          <Route element={<PrivateRoute />}>
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/pruchase-coins" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
