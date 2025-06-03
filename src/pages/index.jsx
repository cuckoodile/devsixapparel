import React from "react";
import { ArrowRight, Star, Sparkles } from "lucide-react";

export default function Index() {
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  const newArrivals = [
    {
      id: 1,
      name: "Barong Tagalog Modern Fit",
      price: "₱2,999",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Modern fit Barong Tagalog",
    },
    {
      id: 2,
      name: "Filipiniana Dress - Emerald",
      price: "₱3,499",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Emerald Filipiniana dress",
    },
    {
      id: 3,
      name: "Baybayin Print Tee",
      price: "₱799",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Baybayin print t-shirt",
    },
    {
      id: 4,
      name: "Philippine Flag Hoodie",
      price: "₱1,499",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Philippine flag hoodie",
    },
  ];

  const categories = [
    {
      name: "Heritage & Elegance",
      description: "Timeless Barongs & Filipinianas crafted with authentic Filipino artistry and modern sophistication",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Traditional Filipino clothing",
      url: "/allproducts?category=traditional",
      gradient: "from-blue-500/30 to-indigo-500/30",
      hoverGradient: "from-blue-400/40 to-indigo-400/40",
      textGradient: "from-blue-400 to-indigo-400",
      borderGradient: "from-blue-500/50 to-indigo-500/50",
    },
    {
      name: "Urban Filipino",
      description: "Contemporary streetwear that celebrates Filipino culture with bold modern flair and urban edge",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Urban Filipino streetwear",
      url: "/allproducts?category=streetwear",
      gradient: "from-orange-500/30 to-red-500/30",
      hoverGradient: "from-orange-400/40 to-red-400/40",
      textGradient: "from-orange-400 to-red-400",
      borderGradient: "from-orange-500/50 to-red-500/50",
    },
    {
      name: "Signature Touches",
      description: "Handcrafted accessories that add authentic Filipino charm and distinctive character to every outfit",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Filipino accessories",
      url: "/allproducts?category=accessories",
      gradient: "from-yellow-500/30 to-amber-500/30",
      hoverGradient: "from-yellow-400/40 to-amber-400/40",
      textGradient: "from-yellow-400 to-amber-400",
      borderGradient: "from-yellow-500/50 to-amber-500/50",
    },
  ];

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
                    alt={product.alt}
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
          {categories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => navigate(category.url)}
              className="group w-full text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black relative"
              aria-label={`View ${category.name} Collection`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg xs:rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-700 hover:border-transparent relative">
                {/* wag na palitan hirap nito- joe
                gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${category.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg xs:rounded-xl`} />
                <div className="absolute inset-[1px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg xs:rounded-xl" />
                
                <div className="relative">
                  <div className="h-60 xs:h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden relative">
                    <img
                      src={category.image}
                      alt={category.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/500?text=${category.name}`;
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} group-hover:${category.hoverGradient} transition-all duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                    
                    {/* tol ito yung glowing effect on hover  */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay`} />
                  </div>
                  
                  <div className="p-3 xs:p-4 sm:p-5 md:p-6 text-left relative">
                    <h3 className={`text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 xs:mb-2 sm:mb-3 group-hover:bg-gradient-to-r group-hover:${category.textGradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                      {category.name}
                    </h3>
                    <p className="text-gray-400 text-xs xs:text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}