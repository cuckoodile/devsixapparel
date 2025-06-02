import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { CircleUser } from "lucide-react";
import NavigationText from "./Texts/NavigationText";

export default function Header() {
  return (
    <div className="bg-[var(--header-background)] sticky inset-0 text-white px-5 py-1 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <NavigationText variant={"main"} to={"/"}>
          DevSixApparel
        </NavigationText>
        <NavigationText variant={"main"} to={"/allproducts"}>
          All Products
        </NavigationText>
      </div>

      <div className="flex items-center gap-3">
        <NavigationText variant={"main"} to={"admin/admins"}>
          Admin
        </NavigationText>
        <NavigationText variant={"main"} to={"profile/69/"}>
          <CircleUser size={32} />
        </NavigationText>
      </div>
    </div>
  );
}
