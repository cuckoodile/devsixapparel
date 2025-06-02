import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <div>Index</div>
      <Link to="/productdetails/69">Product Detail</Link>
    </div>
  );
}
