import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { CircleUser } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-sky-600 text-white px-5 py-1 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Link
          to={"/"}
          className="text-2xl font-bold cursor-pointer"
        >
          DevSixApparel
        </Link>
        <Link
          to={"/allproducts"}
          className="text-2xl cursor-pointer"
        >
          All Products
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to={"admin/admins"}
          className="text-2xl cursor-pointer"
        >
          Admin
        </Link>

        <CircleUser
          onClick={() => handleNavigate("profile/69/")}
          size={32}
          color="white"
          className="cursor-pointer"
        />
      </div>

      {/* <nav className="flex flex-1 justify-center text-center mt-10">
        <ul>
          <li
            className="cursor-pointer hover:bg-sky-700"
            onClick={() => navigate("")}
          >
            Landing page
          </li>
          <li
            className="cursor-pointer hover:bg-sky-700"
            onClick={() => navigate("login")}
          >
            Auth Login and Register
          </li>
          <li
            className="cursor-pointer hover:bg-sky-700"
            onClick={() => navigate("allproducts")}
          >
            All products
          </li>
          <li
            className="cursor-pointer hover:bg-sky-700"
            onClick={() => navigate("productdetails/999")}
          >
            Product details
          </li>
          <li
            className="cursor-pointer hover:bg-sky-700"
            onClick={() => navigate("profile/69")}
          >
            My profile
          </li>
          <li
            className="cursor-pointer hover:bg-sky-700"
            onClick={() => navigate("profile/69/carts")}
          >
            My carts
          </li>
          <li
            className="cursor-pointer hover:bg-sky-700"
            onClick={() => navigate("profile/69/purchases")}
          >
            My purchases
          </li>
          <li
            className="cursor-pointer hover:bg-sky-700"
            onClick={() => navigate("admin/")}
          >
            Admins landing page
          </li>
          <li
            className="cursor-pointer hover:bg-sky-700"
            onClick={() => navigate("admin/productlists")}
          >
            Product list
          </li>
          <li
            className="cursor-pointer hover:bg-sky-700"
            onClick={() => navigate("admin/admins")}
          >
            Admin panel
          </li>
          <li
            className="cursor-pointer hover:bg-sky-700"
            onClick={() => navigate("admin/shippers")}
          >
            Shipping panel
          </li>
          <li
            className="cursor-pointer hover:bg-sky-700"
            onClick={() => navigate("admin/trackers")}
          >
            Tracker panel
          </li>
        </ul>
      </nav> */}
    </div>
  );
}
