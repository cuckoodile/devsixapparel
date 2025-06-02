import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import NavigationText from "../../components/Texts/NavigationText";

export default function Index_Profile() {
  const paramsId = useParams().id;

  return (
    <div className="size-full flex">
      <div className="min-w-[10vw] py-5 flex flex-col bg-secondary border-r border-border">
        <NavigationText to={`/profile/${paramsId}/`}>My Profile</NavigationText>
        <NavigationText to={`/profile/${paramsId}/carts`}>carts</NavigationText>
        <NavigationText to={`/profile/${paramsId}/purchases`}>
          purchases
        </NavigationText>
      </div>

      <div className="size-full flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}
