import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query"; // Import QueryClient
import useLogin from "../api/hooks/auth/logIn";

const queryClient = new QueryClient(); // Initialize QueryClient

export default function Auth() {
  const loginMutation = useLogin();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    loginMutation.mutate(formData, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["user"]); // Use the initialized queryClient
        console.log("To be placed in localSession data: ", data.access);
        sessionStorage.setItem("user", data.access); // Store the response in sessionStorage

        try {
          const payload = data.access.split('.')[1];
          const decodedPayload = JSON.parse(atob(payload));
          console.log("Decoded token payload:", decodedPayload);
          
          // Store the user ID
          sessionStorage.setItem("userId", decodedPayload.user_id);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
        
        navigate("/"); // Navigate to the home page or another route
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800/50 backdrop-blur-sm p-10 rounded-xl shadow-2xl border border-gray-700">
        <div>
          <h2 className="mt-6 text-center text-4xl font-bold text-green-400">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h2>
          <p className="mt-3 text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-green-400 hover:text-green-300 transition-colors duration-200"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="relative">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                placeholder="Enter your username"
                value={formData.username} // Fix the value binding
                onChange={handleInputChange}
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {!isLogin && (
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500 rounded transition-colors duration-200"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-green-400 hover:text-green-300 transition-colors duration-200"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 shadow-lg"
            >
              {isLogin ? "Sign in" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}