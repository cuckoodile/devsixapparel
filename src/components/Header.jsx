import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUser, ShoppingCart } from "lucide-react";
import NavigationText from "./Texts/NavigationText";

export default function Header() {
  const userId = sessionStorage.getItem("userId");

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 sticky inset-0 border-b border-gray-700 shadow-lg z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <NavigationText 
              variant={"main"} 
              to={"/"} 
              className="text-green-400 font-bold text-xl hover:text-green-300 transition-colors duration-200"
            >
              DevSixApparel
            </NavigationText>
            <NavigationText 
              variant={"main"} 
              to={"/allproducts"}
              className="text-gray-300 hover:text-green-400 transition-colors duration-200"
            >
              All Products
            </NavigationText>
          </div>

          <div className="flex items-center space-x-6">
            <NavigationText 
              variant={"main"} 
              to={"admin/admins"}
              className="text-gray-300 hover:text-green-400 transition-colors duration-200"
            >
              Admin
            </NavigationText>

            <NavigationText to={"/profile/1/carts"} variant={"main"} className="text-gray-300 hover:text-green-400 transition-colors duration-200">
              <ShoppingCart size={24} />
            </NavigationText>

            <NavigationText 
              variant={"main"} 
              to={userId ? `/profile/${userId}/` : "/login"}
              className="text-gray-300 hover:text-green-400 transition-colors duration-200"
            >
              <CircleUser size={24} />
            </NavigationText>
          </div>
        </div>
      </div>
    </div>
  );
}