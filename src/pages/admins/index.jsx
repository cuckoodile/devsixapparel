import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Index_Admin() {
  return (
    <div className="size-full flex">
      <div className="min-w-[10vw] text-white p-5 flex flex-col">
        <Link to={`/admin/admins`}>Admin</Link>
        <Link to={`/admin/shippers`}>Shipper</Link>
        <Link to={`/admin/trackers`}>Tracker</Link>
        <Link to={`/admin/productlists`}>Product List</Link>
      </div>

      <div className="size-full flex justify-center bg-orange-200">
        <Outlet />
      </div>
    </div>
  );
}
