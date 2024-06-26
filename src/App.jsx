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
import PurchaseCoins from "./pages/PurchaseCoins";
import Success from "./components/Success";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/all-recipes" element={<AllRecipes />} />
          <Route path="/success/:amount" element={<Success />} />
          <Route element={<PrivateRoute />}>
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/pruchase-coins" element={<PurchaseCoins />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
