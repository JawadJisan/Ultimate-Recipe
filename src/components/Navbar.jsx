import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  // console.log(user);
  return (
    <nav>
      <div className="container flex justify-between py-6 items-center">
        <Link to="/">
          {/* <img
            src="./assets/images/logo.png"
            alt="Ultimate Recipe"
            className="object-cover h-[40px] text-[#eb4a36]"
          /> */}
          <p className="font-extrabold text-[#eb4a36]">Ultimate Recipe</p>
        </Link>

        <ul className="flex items-center gap-4 text-sm text-gray-500">
          <li className="py-2 active">
            <Link to="/">Home</Link>
          </li>

          <li className="py-2">
            <Link to="/all-recipes">Recipe</Link>
          </li>

          {user ? (
            <>
              <li className="py-2">
                <Link to="/add-recipe">Add Recipe</Link>
              </li>
              <li className="py-2 font-bold p-2 rounded-full text-white bg-[#eb4a36]">
                <button onClick={() => navigate("/purchase-coins")}>
                  {user.coin}
                </button>
              </li>
              <li className="py-2">
                <img
                  className="rounded-full w-10 h-10"
                  src={user.photoURL}
                  alt=""
                />
              </li>
              <li className="py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center">
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <li className="py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center">
              <button onClick={login}>Google Login</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
