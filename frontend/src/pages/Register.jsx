import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import {URL} from '../url'

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    profilePicture: null,
    termsAccepted: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("")
    try {
      // Validate form data
      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.name
      ) {
        throw new Error("All fields are required");
      }
      if (!validateEmail(formData.email)) {
        throw new Error("Invalid email format");
      }
      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      if (!formData.termsAccepted) {
        throw new Error("Please accept the terms and conditions");
      }
      
      const { confirmPassword, profilePicture, ...data } = formData;

      if(formData.profilePicture){
        const info = new FormData();  
        const filename=Date.now()+formData.profilePicture.name
        info.append("img",filename)
        info.append("file",formData.profilePicture)
        data.profilePicture=filename
        
        // API call profile upload
          const imgUpload=await axios.post(`${URL}/api/upload`,info)
          // console.log(imgUpload.data)
        
      }
  
    // API call
      const response = await axios.post(`${URL}/api/auth/register`, data); 
      console.log(response.data); 
      
      setSuccess(response.data.message);

      setTimeout(() => {
        setSuccess("");
        navigate('/login');
      }, 2000); // Redirect to posts after 2 seconds


    } catch (err) {
      if (err.response) {
        // Server responded with a status code
        if (err.response.status === 400) {
          setError(err.response.data.message);
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
        <div className="w-full px-6 py-6  bg-white shadow-md rounded-md sm:rounded-lg max-w-sm">

          <h1 className="font-bold md:text-2xl text-xl mb-2 mx-auto text-center text-purple-700">Signup</h1>
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
              <label htmlFor="username" className="block mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className=" bg-gray-50 border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-1">
                Confirm Password
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
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className=" bg-gray-50 border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="profilePicture" className="block mb-1">
                Profile Picture (optional)
              </label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="termsAccepted"
                className="inline-flex items-center"
              >
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm">
                  I agree to the terms and conditions
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-purple-700 hover:bg-purple-600 w-full py-2 px-4 rounded transition-colors duration-300"
            >
              Sign up
            </button>
          </form>

          <div className="mt-4 text-zinc-600 text-md">
          Already have an account?{" "}
          <span>
            <Link
              className="text-purple-600 hover:text-purple-800 hover:underline"
              to={"/login"}
            >
              Login instead
            </Link>
          </span>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Register;