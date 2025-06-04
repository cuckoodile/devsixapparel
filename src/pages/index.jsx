import React, { useState, useEffect } from "react";
import { ArrowRight, Star, Sparkles, Heart, ShoppingBag, Eye, Plus } from "lucide-react";

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  const newArrivals = [
    {
      id: 1,
      name: "Barong Tagalog Modern Fit",
      price: "₱2,999",
      originalPrice: "₱3,999",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Modern fit Barong Tagalog",
      tag: "Bestseller",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Filipiniana Dress - Emerald",
      price: "₱3,499",
      originalPrice: "₱4,499",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Emerald Filipiniana dress",
      tag: "New",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Baybayin Print Tee",
      price: "₱799",
      originalPrice: "₱999",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Baybayin print t-shirt",
      tag: "Limited",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Philippine Flag Hoodie",
      price: "₱1,499",
      originalPrice: "₱1,999",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Philippine flag hoodie",
      tag: "Trending",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Traditional Baro't Saya",
      price: "₱4,299",
      originalPrice: "₱5,299",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Traditional Baro't Saya",
      tag: "Heritage",
      rating: 4.9,
    },
    {
      id: 6,
      name: "Manila Vintage Jacket",
      price: "₱2,199",
      originalPrice: "₱2,799",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Manila vintage jacket",
      tag: "Urban",
      rating: 4.5,
    },
  ];

  const categories = [
    {
      name: "Heritage & Elegance",
      description: "Timeless Barongs & Filipinianas crafted with authentic Filipino artistry",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Traditional Filipino clothing",
      url: "/allproducts?category=traditional",
      gradient: "from-blue-500/30 to-indigo-500/30",
      hoverGradient: "from-blue-400/50 to-indigo-400/50",
      textGradient: "from-blue-400 to-indigo-400",
      accent: "bg-blue-500",
      items: "50+ Items",
    },
    {
      name: "Urban Filipino",
      description: "Contemporary streetwear celebrating Filipino culture with modern flair",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Urban Filipino streetwear",
      url: "/allproducts?category=streetwear",
      gradient: "from-orange-500/30 to-red-500/30",
      hoverGradient: "from-orange-400/50 to-red-400/50",
      textGradient: "from-orange-400 to-red-400",
      accent: "bg-orange-500",
      items: "75+ Items",
    },
    {
      name: "Signature Touches",
      description: "Handcrafted accessories with authentic Filipino charm",
      image: "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
      alt: "Filipino accessories",
      url: "/allproducts?category=accessories",
      gradient: "from-yellow-500/30 to-amber-500/30",
      hoverGradient: "from-yellow-400/50 to-amber-400/50",
      textGradient: "from-yellow-400 to-amber-400",
      accent: "bg-yellow-500",
      items: "30+ Items",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-slate-900 to-black">
      {/* Compact Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className={`text-center w-full transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 rounded-full text-sm font-medium border border-orange-500/30">
                Proudly Filipino
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Modern Filipino
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent block animate-pulse">
                Fashion
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Where heritage meets contemporary style. Discover Filipino-inspired fashion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/allproducts")}
                className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-400 hover:to-red-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Shop Collection
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={18} />
              </button>
              <button
                onClick={() => navigate("/about")}
                className="inline-flex items-center px-6 py-3 bg-transparent border border-white/30 text-white rounded-full hover:border-white/50 hover:bg-white/5 transition-all duration-300 font-semibold"
              >
                Our Story
                <Eye className="ml-2" size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Compact New Arrivals Section */}
      <section className="relative mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-black to-slate-900/50">
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-yellow-400" size={20} />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">New Arrivals</h2>
            </div>
            <p className="text-gray-400 text-sm">Fresh drops defining Filipino fashion</p>
          </div>
          <button
            onClick={() => navigate("/allproducts")}
            className="group text-orange-400 hover:text-orange-300 transition-colors duration-200 flex items-center gap-1 text-sm font-medium"
          >
            View All
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={16} />
          </button>
        </div>
        
        {/* Compact Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {newArrivals.map((product, index) => (
            <div
              key={product.id}
              className={`transform transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <button
                onClick={() => navigate(`/productdetails/${product.id}`)}
                className="group w-full text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/50 hover:border-orange-500/30">
                  {/* Compact Image */}
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    
                    {/* Quick Add Button */}
                    <div className={`absolute inset-x-2 bottom-2 transform transition-all duration-300 ${hoveredProduct === product.id ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
                      <button className="w-full bg-white/90 text-gray-900 py-1.5 px-3 rounded-lg text-xs font-medium hover:bg-white transition-colors duration-200 flex items-center justify-center">
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                  
                  {/* Compact Content */}
                  <div className="p-3">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                    </div>
                    
                    {/* Product Name */}
                    <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors duration-200 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                    
                    {/* Price */}
                    <div className="flex items-center gap-1">
                      <span className="text-orange-400 font-bold text-sm">{product.price}</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Compact Categories Section */}
      <section className="relative mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-slate-900/50 to-gray-900/70">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-yellow-400 animate-pulse" size={20} />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Explore Collections</h2>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto">
            Curated collections celebrating Filipino heritage through contemporary design
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <button
                onClick={() => navigate(category.url)}
                className="group w-full text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700/50 hover:border-transparent">
                  <div className="relative">
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={category.image}
                        alt={category.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} group-hover:${category.hoverGradient} transition-all duration-500`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className={`px-2 py-1 ${category.accent} text-white text-xs font-bold rounded-full`}>
                          {category.items}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className={`text-xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:${category.textGradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                        {category.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center text-orange-400 group-hover:text-orange-300 transition-colors duration-200">
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-200" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}