import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";

export default function Index_Profile() {
  const paramsId = useParams().id;

  return (
    <div className="size-full flex">
      <div className="min-w-[10vw] text-white p-5 flex flex-col">
        <Link to={`/profile/${paramsId}/`}>My Profile</Link>
        <Link to={`/profile/${paramsId}/carts`}>carts</Link>
        <Link to={`/profile/${paramsId}/purchases`}>purchases</Link>
      </div>

      <div className="size-full flex justify-center bg-orange-200">
        <Outlet />
      </div>
    </div>
  );
}
