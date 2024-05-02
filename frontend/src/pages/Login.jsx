import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios'
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false 
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const {showPassword, ...data}=  formData
      // API call
      const response = await axios.post(URL+'/api/auth/login', data,{withCredentials:true});

      setSuccess(response.data.message);
      setUser(response.data)
      navigate("/posts");

    } catch (err) {
      if (err.response) {
        // Server responded with a status code
        if (err.response.status === 401) {
          setError("Invalid password. Please try again.");
        } else if (err.response.status === 404) {
          setError("User not registered. Please sign up.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      }
      else  setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="flex flex-col items-center py-10 sm:justify-center w-full">
        <div className="w-full px-6 py-6 bg-white shadow-md rounded-md sm:rounded-lg max-w-sm">
          <h1 className="font-bold md:text-2xl text-xl mb-2 mx-auto text-center text-purple-700">Login</h1>
          <form onSubmit={handleSubmit} className="group">
            {error && (
              <h3 className="text-red-500 text-sm mb-2 mx-auto text-center">
                {error}
              </h3>
            )}
            {success && (
              <h3 className="text-green-500 text-sm mb-2 mx-auto text-center">
                {success}
              </h3>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                type={formData.showPassword ? "text" : "password"} // Toggle password visibility
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 p-2 rounded w-full pr-10" // Add extra padding for icon button
              />
              {/* Password visibility toggle button */}
              <button
                type="button"
                className="absolute top-12 right-2 transform -translate-y-1/2 bg-gray-400 border-none focus:outline-none p-2 rounded-md"
                onClick={togglePasswordVisibility}
              >
                {formData.showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button
              type="submit"
              className="text-white bg-purple-700 hover:bg-purple-600 w-full py-2 px-4 rounded transition-colors duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-2 text-sm text-center">
            <Link to="/resetpassword" className="text-purple-600 hover:underline">Forgot Password?</Link>
          </div>

          <div className="mt-4 text-zinc-600 text-md">
            Don't have an account?{" "}
            <span>
              <Link
                className="text-purple-600 hover:text-purple-800 hover:underline"
                to={"/register"}
              >
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
