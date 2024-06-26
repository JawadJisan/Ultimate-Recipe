import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { auth, provider, signInWithPopup } from "../../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      const idToken = await result.user.getIdToken();
      // console.log(idToken, "idToken");

      const res = await axios.post(
        "https://ultimate-recipe-server-twin.vercel.app/api/users/login",
        // "http://localhost:5000/api/users/login",
        {
          idToken,
        }
      );
      // console.log(res, "res from server");
      const token = res.data.token;
      const userInfo = res.data.user;

      localStorage.setItem("token", token);
      setUser(userInfo);
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
    localStorage.removeItem("token");
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   // console.log(token);
  //   if (token) {
  //     axios
  //       .get("https://ultimate-recipe-server-twin.vercel.app/api/users/me", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setUser(res.data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching user", err);
  //         setLoading(false);
  //       });
  //   } else {
  //     setLoading(false);
  //   }
  // }, [refetchMe]);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.get(
          "https://ultimate-recipe-server-twin.vercel.app/api/users/me",
          {
            // const res = await axios.get("http://localhost:5000/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user", err);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, fetchUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
