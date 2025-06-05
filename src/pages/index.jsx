import React from "react";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import useGetProduct from "../api/hooks/products/useGetProducts"
import useGetCategories from "../api/hooks/categories/useGetCategories";

export default function Index() {
  const { data: products, isLoading: productsLoading, isError: productsError } = useGetProduct();
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useGetCategories();

  // Your original navigate function that logs the path
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  // console.log("Component Render Cycle:");
  // console.log("  categories:", categories);
  // console.log("  categoriesLoading:", categoriesLoading);
  // console.log("  categoriesError:", categoriesError);
  // console.log("  Does categories exist and have length > 0?", categories && categories.length > 0);
  // Get newest products by newly created, limits to 4
  const newArrivals = products
    ? [...products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4)
    : [];

  // since wala pang image, maglalagay tayo ng gradient nalang 
  const defaultCategoryGradients = [
    {
      border: 'from-blue-500 to-purple-500',
      main: 'from-blue-500/30 to-purple-500/30',
      hover: 'from-blue-400/50 to-purple-400/50',
      text: 'from-blue-400 to-purple-400',
    },
    {
      border: 'from-green-500 to-teal-500',
      main: 'from-green-500/30 to-teal-500/30',
      hover: 'from-green-400/50 to-teal-400/50',
      text: 'from-green-400 to-teal-400',
    },
    {
      border: 'from-yellow-500 to-orange-500',
      main: 'from-yellow-500/30 to-orange-500/30',
      hover: 'from-yellow-400/50 to-orange-400/50',
      text: 'from-yellow-400 to-orange-400',
    },
    {
        border: 'from-pink-500 to-red-500',
        main: 'from-pink-500/30 to-red-500/30',
        hover: 'from-pink-400/50 to-red-400/50',
        text: 'from-pink-400 to-red-400',
    },
  ];

  // Handle loading states for products
  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl">
        Loading data...
      </div>
    );
  }

  // debugging purposes, bahala kayo dyan code ko to!!!!!!!!!!!!!!!
  if (productsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500 text-xl">
        Error loading products. Please try again later.
      </div>
    );
  }

  // debugging purposes, bahala kayo dyan code ko to 
  if (categoriesError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500 text-xl">
        Error loading categories. Some content might be missing.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-slate-900 to-black">
      <section className="relative h-[50vh] xs:h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-slate-900/60 to-gray-900/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 h-full flex items-center">
          <div className="text-left w-full max-w-4xl">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 xs:mb-6 sm:mb-8 leading-tight tracking-tight">
              Modern Filipino
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent block xs:inline animate-pulse">
                {" "}Fashion
              </span>
            </h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 mb-6 xs:mb-8 sm:mb-10 max-w-lg sm:max-w-xl md:max-w-2xl leading-relaxed">
              Explore our curated collection of Filipino-inspired clothing, blending tradition with contemporary elegance. Crafted with pride and precision.
            </p>
            <button
              onClick={() => navigate("/allproducts")}
              className="group inline-flex items-center px-5 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-400 hover:to-red-400 transition-all duration-300 text-sm xs:text-base sm:text-lg font-semibold shadow-lg hover:shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Shop Now"
            >
              Shop Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-screen mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 py-10 xs:py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-slate-900">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 gap-4 xs:gap-6">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white flex items-center gap-2 xs:gap-3">
            <div className="p-1 xs:p-1.5 sm:p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse">
              <Star className="text-white" size={18} />
            </div>
            New Arrivals
          </h2>
          <button
            onClick={() => navigate("/allproducts")}
            className="group text-orange-400 hover:text-orange-300 transition-all duration-200 flex items-center gap-2 font-medium text-sm xs:text-base"
            aria-label="View All Products"
          >
            View All
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
          {newArrivals.map((product) => (
            <button
              key={product.id}
              onClick={() => navigate(`/productdetails/${product.id}`)}
              className="group w-full text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={`View ${product.name}`}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg xs:rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 hover:border-orange-500/50 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-transparent opacity-50" />
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.alt || product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/500?text=Image+Not+Found";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-3 xs:p-4 sm:p-5 relative">
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-white mb-1 xs:mb-2 group-hover:text-orange-300 transition-colors duration-200 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-orange-400 font-bold text-base xs:text-lg sm:text-xl">
                    {product.price}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="max-w-screen mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 py-10 xs:py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-slate-900">
        <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 xs:mb-4 flex items-center justify-center gap-2 xs:gap-3 flex-wrap">
            <Sparkles className="text-yellow-400 animate-pulse" size={20} />
            <span>Explore Our Collections</span>
            <Sparkles className="text-yellow-400 animate-pulse" size={20} />
          </h2>
          <p className="text-gray-400 text-xs xs:text-sm sm:text-base md:text-lg max-w-md xs:max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-4">
            Curated collections celebrating Filipino heritage through modern design
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
          {categories && categories.length > 0 ? (
            categories.map((category, index) => {
              // Get cycling gradients for categories
              const currentGradients = defaultCategoryGradients[index % defaultCategoryGradients.length];
//__________  // Generate a URL slug for navigation, even if it's just logged
              const categoryUrl = `/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`;

              return (
                <button
                  key={category.name} // Using name as key, consider adding a unique 'id' to categories data if available
                  onClick={() => navigate(categoryUrl)} // Still logs the path, no actual navigation
                  className="group w-full text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black relative"
                  aria-label={`View ${category.name} Collection`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg xs:rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-700 hover:border-transparent relative">
                    {/* Gradient border effect - uses predefined classes */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${currentGradients.border} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg xs:rounded-xl`} />
                    <div className="absolute inset-[1px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg xs:rounded-xl" />

                    <div className="relative">
                      <div className="h-60 xs:h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden relative">
                        {/* Placeholder image using category name */}
                        <img
                          src={`https://via.placeholder.com/500?text=${category.name}`}
                          alt={category.name} // Alt text from category name
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        {/* Main gradient overlay - uses predefined classes */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${currentGradients.main} group-hover:${currentGradients.hover} transition-all duration-500`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

                        {/* Glowing effect on hover - uses predefined classes */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${currentGradients.main} opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay`} />
                      </div>

                      <div className="p-3 xs:p-4 sm:p-5 md:p-6 text-left relative">
                        <h3 className={`text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 xs:mb-2 sm:mb-3 group-hover:bg-gradient-to-r group-hover:${currentGradients.text} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                          {category.name}
                        </h3>
                        <p className="text-gray-400 text-xs xs:text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                          {/* Default description if not present */}
                          {category.description || `Discover our unique ${category.name} collection.`}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            // Display a message if no categories are found after loading
            !categoriesLoading && <p className="col-span-full text-center text-gray-400 text-lg">No categories to display yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}