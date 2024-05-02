import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  // const [user,setUser]=useState(false)

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex sticky top-0 items-center justify-between px-6 md:px-20 py-3 bg-gray-800 text-white shadow-lg">
      <h1 className="text-2xl md:text-3xl font-extrabold uppercase italic">
        <Link to={user?`/posts`:'/login'} className="hover:text-purple-400">
          Posts
        </Link>
      </h1>

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-sm md:text-lg py-1 px-3 rounded-lg bg-purple-700 hover:bg-purple-600 transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm md:text-lg py-1 px-3 rounded-lg bg-purple-700 hover:bg-purple-600 transition-colors duration-300"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="text-sm md:text-lg py-1 px-3 rounded-lg bg-purple-700 hover:bg-purple-600 transition-colors duration-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
