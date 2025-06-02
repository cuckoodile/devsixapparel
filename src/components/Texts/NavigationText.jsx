import React from "react";
import { Link } from "react-router-dom";

const variants = {
  default: "text-2xl text-muted-foreground hover:text-foreground",
  main: "text-2xl text-foreground"
};

export default function NavigationText({
  to,
  className = "",
  variant,
  children,
  ...props
}) {
  const variantClass = variants[variant] || variants.default;

  return (
    <Link
      to={to}
      className={`cursor-pointer ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
