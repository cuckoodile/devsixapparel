import React from "react";
import { Link, Outlet } from "react-router-dom";

import NavigationText from "../../components/Texts/NavigationText";

export default function Index_Admin() {
  return (
    <div className="size-full flex">
      <div className="min-w-[10vw] py-5 flex flex-col bg-secondary border-r border-border">
        <NavigationText to={`/admin/admins`}>Admin</NavigationText>
        <NavigationText to={`/admin/shippers`}>Shipper</NavigationText>
        <NavigationText to={`/admin/trackers`}>Tracker</NavigationText>
        <NavigationText to={`/admin/productlists`}>Product List</NavigationText>
      </div>

      <div className="size-full flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}
