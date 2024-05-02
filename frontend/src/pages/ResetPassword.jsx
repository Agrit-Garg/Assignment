import React, { useState } from "react";
import { Link } from "react-router-dom";
import {URL} from '../url'
import axios from 'axios'

const ResetPassword = () => {
  const [email,setEmail]= useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("")
    try {
      // Validate form data
      if (!email) {
        throw new Error("Please enter your email address");
      }

      // API call for sending reset password email
      const response = await axios.post(`${URL}/api/auth/resetpassword`, {email});
      console.log(response.data);

      // successful reset password request
      setSuccess(response.data.message);

    } catch (err) {
      if (err.response) {
        // Server responded with a status code
        if (err.response.status === 404) {
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
          <h1 className="font-bold md:text-2xl text-xl mb-2 mx-auto text-center text-purple-700">Reset Password</h1>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-purple-700 hover:bg-purple-600 w-full py-2 px-4 rounded"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-4 text-zinc-600 text-md">
            Remember your password?{" "}
            <span>
              <Link
                className="text-purple-600 hover:text-purple-800 hover:underline"
                to={"/login"}
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
