import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="h-[150vh]">
      <div>Index</div>
      <Link to="/productdetails/69">Product Detail</Link>
    </div>
  );
}
