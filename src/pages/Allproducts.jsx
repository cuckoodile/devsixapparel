import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Heart,
  Eye,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import useGetProducts from "../api/hooks/products/useGetProducts"; // Adjust the import path as necessary
import useGetCategories from "../api/hooks/categories/useGetCategories";
export default function Allproducts() {
  const { data: productsData, isLoading, isError } = useGetProducts();
  const { data: categoriesData } = useGetCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  // const [productsData, setProductsData] = useState([
  //   {
  //     id: 1,
  //     name: "Barong Tagalog Modern Fit",
  //     price: 2999,
  //     originalPrice: 3499,
  //     category: "traditional",
  //     image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //     rating: 4.8,
  //     reviews: 24,
  //     isNew: true,
  //     isFavorite: false,
  //     description: "Elegant modern fit barong with intricate embroidery"
  //   },
  //   {
  //     id: 2,
  //     name: "Filipiniana Dress - Emerald",
  //     price: 3499,
  //     category: "traditional",
  //     image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //     rating: 4.9,
  //     reviews: 18,
  //     isNew: true,
  //     isFavorite: true,
  //     description: "Stunning emerald Filipiniana dress with traditional silhouette"
  //   },
  //   {
  //     id: 3,
  //     name: "Baybayin Print Tee",
  //     price: 799,
  //     category: "streetwear",
  //     image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //     rating: 4.6,
  //     reviews: 35,
  //     isNew: false,
  //     isFavorite: false,
  //     description: "Contemporary t-shirt featuring ancient Baybayin script"
  //   },
  //   {
  //     id: 4,
  //     name: "Philippine Flag Hoodie",
  //     price: 1499,
  //     category: "streetwear",
  //     image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //     rating: 4.7,
  //     reviews: 42,
  //     isNew: false,
  //     isFavorite: true,
  //     description: "Premium hoodie with subtle Philippine flag design"
  //   },
  //   {
  //     id: 5,
  //     name: "Mindanao Tribal Jacket",
  //     price: 2299,
  //     category: "traditional",
  //     image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //     rating: 4.8,
  //     reviews: 16,
  //     isNew: true,
  //     isFavorite: false,
  //     description: "Hand-woven jacket inspired by Mindanao tribal patterns"
  //   },
  //   {
  //     id: 6,
  //     name: "Manila Streetwear Joggers",
  //     price: 1199,
  //     category: "streetwear",
  //     image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //     rating: 4.5,
  //     reviews: 28,
  //     isNew: false,
  //     isFavorite: false,
  //     description: "Comfortable joggers with Manila-inspired graphics"
  //   },
  //   {
  //     id: 7,
  //     name: "Capiz Shell Earrings",
  //     price: 599,
  //     category: "accessories",
  //     image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //     rating: 4.9,
  //     reviews: 31,
  //     isNew: false,
  //     isFavorite: true,
  //     description: "Delicate earrings crafted from authentic Capiz shells"
  //   },
  //   {
  //     id: 8,
  //     name: "Baro't Saya Set - Royal Blue",
  //     price: 4299,
  //     originalPrice: 4999,
  //     category: "traditional",
  //     image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //     rating: 4.8,
  //     reviews: 12,
  //     isNew: true,
  //     isFavorite: false,
  //     description: "Complete traditional Baro't Saya in royal blue"
  //   },
  //   {
  //     id: 9,
  //     name: "Jeepney Graphic Tee",
  //     price: 899,
  //     category: "streetwear",
  //     image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //     rating: 4.4,
  //     reviews: 47,
  //     isNew: false,
  //     isFavorite: false,
  //     description: "Vibrant tee featuring iconic Filipino jeepney design"
  //   },
  //   {
  //     id: 10,
  //     name: "Banig Clutch Bag",
  //     price: 899,
  //     category: "accessories",
  //     image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //     rating: 4.7,
  //     reviews: 22,
  //     isNew: false,
  //     isFavorite: true,
  //     description: "Handwoven clutch bag made from traditional banig"
  //   },
  //   {
  //     id: 11,
  //     name: "Terno Sleeve Blouse",
  //     price: 1899,
  //     category: "traditional",
  //     image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //     rating: 4.6,
  //     reviews: 19,
  //     isNew: false,
  //     isFavorite: false,
  //     description: "Modern interpretation of the classic Terno sleeve"
  //   },
  //   {
  //     id: 12,
  //     name: "Pinoy Pride Bomber Jacket",
  //     price: 2199,
  //     category: "streetwear",
  //     image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //     rating: 4.8,
  //     reviews: 33,
  //     isNew: true,
  //     isFavorite: false,
  //     description: "Premium bomber jacket with Filipino pride embroidery"
  //   }
  // ]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // const categories = [
  //   { id: "all", name: "All Products", count: 24 },
  //   { id: "traditional", name: "Heritage & Elegance", count: 8 },
  //   { id: "streetwear", name: "Urban Filipino", count: 10 },
  //   { id: "accessories", name: "Signature Touches", count: 6 },
  // ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  useEffect(() => {
    let filtered = productsData ? [...productsData] : [];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, productsData]);

  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  const addToCart = (productId) => {
    console.log(`Add to cart: ${productId}`);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error loading products</h1>;
  }
  return (
    <div className="min-h-screen w-full bg-gray-900">
      {/* Header Section */}
      <section className="bg-gray-800 py-12 px-4 xs:px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              All Products
            </h1>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Discover our complete collection of Filipino-inspired fashion
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 py-8">
          {/* New Horizontal Filter Bar */}
          <div className="mb-8">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full bg-gray-800 text-white py-3 px-4 rounded-xl border border-gray-700 flex items-center justify-between mb-4"
            >
              <span className="flex items-center gap-2">
                <Filter size={18} />
                Filters & Sort
              </span>
              <ChevronDown
                size={18}
                className={`transform transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Horizontal Filters - Always visible on desktop, toggleable on mobile */}
            <div
              className={`${
                showFilters ? "block" : "hidden lg:block"
              } bg-gray-800 rounded-xl p-6 border border-gray-700`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Categories Section */}
                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Filter size={18} />
                    Categories
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2">
                    {categoriesData?.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                          selectedCategory === category.id
                            ? "bg-orange-500 text-white shadow-lg"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="truncate w-full text-center">
                            {category.name}
                          </span>
                          <span className="text-xs opacity-70">
                            ({category.count})
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Section */}
                <div>
                  <h3 className="text-white font-semibold mb-4">Sort By</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                    {sortOptions?.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium text-left ${
                          sortBy === option.value
                            ? "bg-orange-500 text-white shadow-lg"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main>
            {/* View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-300">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:text-white"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:text-white"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts?.map((product) => (
                <div
                  key={product.id}
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
                      src={product.images[0]?.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          NEW
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          SALE
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() =>
                          navigate(`/productdetails/${product.id}`)
                        }
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-orange-500 transition-colors backdrop-blur-sm"
                      >
                        <Eye size={16} />
                      </button>
                    </div>

                    {/* Quick Add to Cart */}
                    <button
                      onClick={() => addToCart(product.id)}
                      className="absolute bottom-3 left-3 right-3 bg-orange-500 text-white py-2 px-4 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>

                  {/* Product Details */}
                  <div
                    className={`p-4 ${
                      viewMode === "list"
                        ? "flex-1 flex flex-col justify-between"
                        : ""
                    }`}
                  >
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-orange-300 transition-colors">
                        {product.name}
                      </h3>

                      {viewMode === "list" && (
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)]?.map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-400 text-sm">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400 font-bold text-xl">
                          ₱{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">
                            ₱{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-white text-xl font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
