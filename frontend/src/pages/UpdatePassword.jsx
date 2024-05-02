import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {URL} from '../url'
import axios from 'axios'

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate= useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Validate form data
      if (!formData.newPassword || !formData.confirmPassword) {
        throw new Error("Please fill in all fields");
      }

      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (formData.newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      // API call for updating password
      const response = await axios.post(`${URL}/api/auth/updatepassword`, {newPassword:formData.newPassword,token:id});
      console.log(response.data);

      // Simulate successful password update
      setSuccess(response.data.message);

      setTimeout(() => {
        setSuccess("");
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      if (err.response) {
        // Server responded with a status code
        if (err.response.status === 401) {
          setError(err.response.message);
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
          <h1 className="font-bold md:text-2xl text-xl mb-2 mx-auto text-center text-purple-700">Update Password</h1>
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
              <label htmlFor="newPassword" className="block mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-purple-700 hover:bg-purple-600 w-full py-2 px-4 rounded"
            >
              Update Password
            </button>
          </form>

          <div className="mt-4 text-zinc-600 text-md">
            <span>
              <Link
                className="text-purple-600 hover:text-purple-800 hover:underline"
                to={"/login"}
              >
                Back to Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
