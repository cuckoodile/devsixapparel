import { Eye, ShoppingCart, Star } from "lucide-react";
import React from "react";

export default function ProductCard1({ product, viewMode }) {
  console.log("PRODUCT: ", product);

  return (
    <div
      key={product?.id}
      className={`group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      {/* Product Image */}
      <div
        className={`relative overflow-hidden ${
          viewMode === "list" ? "w-48 h-48" : "aspect-[3/4]"
        }`}
      >
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product?.isNew && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              NEW
            </span>
          )}
          {product?.originalPrice && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              SALE
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => navigate(`/productdetails/${product?.id}`)}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-orange-500 transition-colors backdrop-blur-sm"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Quick Add to Cart */}
        <button
          onClick={() => addToCart(product?.id)}
          className="absolute bottom-3 left-3 right-3 bg-orange-500 text-white py-2 px-4 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>

      {/* Product Details */}
      <div
        className={`p-4 ${
          viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""
        }`}
      >
        <div>
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-orange-300 transition-colors">
            {product?.name}
          </h3>

          {viewMode === "list" && (
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {product?.description}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product?.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">
              {product?.rating} ({product?.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-orange-400 font-bold text-xl">
              ₱{product?.price.toLocaleString()}
            </span>
            {product?.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ₱{product?.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
