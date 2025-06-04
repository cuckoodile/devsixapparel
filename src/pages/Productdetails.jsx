import React, { useState, useEffect } from 'react';
import {
  Heart,
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Share2,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  RefreshCw,
  Award,
  MessageCircle,
  Check
} from 'lucide-react';

export default function Productdetails() {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false); 

  // Mock product data - in real app, fetch based on ID
  useEffect(() => {
    const mockProduct = {
      id: 1,
      name: "Barong Tagalog Modern Fit",
      price: 2999,
      originalPrice: 3499,
      category: "traditional",
      rating: 4.8,
      reviews: 24,
      isNew: true,
      inStock: true,
      stockCount: 15,
      images: [
        "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
        "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
        "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
        "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
        "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
        
        "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg"
      ],
      colors: [
        { name: "White", value: "#ffffff", inStock: true },
        { name: "Cream", value: "#f5f5dc", inStock: true },
        { name: "Light Blue", value: "#add8e6", inStock: false }
      ],
      sizes: [
        { name: "XS", inStock: true },
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: true },
        { name: "XL", inStock: true },
        { name: "XXL", inStock: false }
      ],
      description: "This elegant modern fit Barong Tagalog represents the perfect fusion of traditional Filipino craftsmanship and contemporary design. Made from premium Jusi fabric, it features intricate embroidery that tells the story of our rich cultural heritage. The modern cut ensures a comfortable fit while maintaining the dignity and elegance of this iconic Filipino formal wear.",
      features: [
        "Premium Jusi fabric construction",
        "Hand-embroidered traditional patterns",
        "Modern tailored fit",
        "Moisture-wicking properties",
        "Easy care - machine washable",
        "Made by local Filipino artisans"
      ],
      specifications: {
        "Material": "100% Jusi (Banana Silk)",
        "Origin": "Handcrafted in Lumban, Laguna",
        "Care": "Machine wash cold, hang dry",
        "Fit": "Modern tailored fit",
        "Occasion": "Formal events, weddings, cultural celebrations"
      }
    };

    setProduct(mockProduct);
    const initialColor = mockProduct.colors.find(color => color.inStock)?.name || '';
    setSelectedColor(initialColor);

    const defaultSize = mockProduct.sizes.find(size => size.name === 'M' && size.inStock);
    setSelectedSize(defaultSize?.name || mockProduct.sizes.find(size => size.inStock)?.name || '');
  }, []);

  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < product?.stockCount) {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) {
      alert("Please select a size and color before adding to cart.");
      return;
    }

    console.log('Adding to cart:', {
      productId: product.id,
      quantity,
      selectedSize,
      selectedColor
    });
    // Simulate adding to cart successfully
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000); // Reset after 3 seconds
  };

  const reviews = [
    {
      id: 1,
      name: "Jayson De Guzman",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely beautiful! The embroidery is exquisite and the fit is perfect. Wore it to my cousin's wedding and received so many compliments.",
      verified: true
    },
    {
      id: 2,
      name: "Zanjoe Gonzales",
      rating: 5,
      date: "1 month ago",
      comment: "High quality fabric and craftsmanship. True to size and very comfortable to wear. Highly recommend!",
      verified: true
    },
    {
      id: 3,
      name: "Ryan Delos Santos",
      rating: 4,
      date: "2 months ago",
      comment: "Beautiful barong, though the shipping took a bit longer than expected. But the quality makes up for it!",
      verified: true
    }
  ];

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Determine if the currently selected size and color combination is in stock
  const isCurrentSelectionInStock = product.inStock &&
    product.colors.find(c => c.name === selectedColor)?.inStock &&
    product.sizes.find(s => s.name === selectedSize)?.inStock;


  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white">
      <div className="bg-gray-900 min-h-screen">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/4] bg-gray-800 rounded-xl overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    NEW
                  </span>
                )}
                {product.originalPrice && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    SALE
                  </span>
                )}

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-5 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-orange-500' : 'border-gray-700'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="text-yellow-400 font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-orange-400">
                    ₱{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ₱{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-red-500 text-white text-sm px-2 py-1 rounded font-medium">
                        Save ₱{(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-6">
                  {isCurrentSelectionInStock ? (
                    <>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-400">In Stock ({product.stockCount} available)</span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-red-400">Out of Stock</span>
                    </>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-medium">Color:</span>
                  <span className="text-orange-400">{selectedColor || 'Please select'}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => color.inStock && setSelectedColor(color.name)}
                      disabled={!color.inStock}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-orange-500 ring-2 ring-orange-500/30'
                          : 'border-gray-600'
                      } ${!color.inStock ? 'opacity-50 cursor-not-allowed' : 'hover:border-orange-400'}`}
                      style={{ backgroundColor: color.value }}
                    >
                      {!color.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-0.5 h-12 bg-red-500 transform rotate-45"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Size:</span>
                    <span className="text-orange-400">{selectedSize || 'Please select'}</span>
                  </div>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-orange-400 hover:text-orange-300 text-sm underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => size.inStock && setSelectedSize(size.name)}
                      disabled={!size.inStock}
                      className={`py-2 px-3 border rounded-lg transition-all text-center ${
                        selectedSize === size.name
                          ? 'border-orange-500 bg-orange-500 text-white'
                          : size.inStock
                            ? 'border-gray-600 hover:border-orange-400 text-gray-300'
                            : 'border-gray-700 text-gray-600 cursor-not-allowed line-through'
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div>
                  <span className="font-medium block mb-3">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-600 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange('decrease')}
                        disabled={quantity <= 1}
                        className="p-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange('increase')}
                        disabled={quantity >= product.stockCount || !isCurrentSelectionInStock}
                        className="p-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!isCurrentSelectionInStock || !selectedSize || !selectedColor}
                    className={`flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${addedToCart ? 'bg-green-500' : ''}`}
                  >
                    {addedToCart ? (
                      <>
                        <Check size={18} /> Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button className="p-3 rounded-lg border border-gray-600 text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-700">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="text-orange-400" size={18} />
                  <span>Authentic Quality</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="text-orange-400" size={18} />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RefreshCw className="text-orange-400" size={18} />
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award className="text-orange-400" size={18} />
                  <span>Local Artisan Made</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-700">
              <nav className="flex gap-8">
                {['description', 'specifications', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 border-b-2 font-medium transition-colors capitalize ${
                      activeTab === tab
                        ? 'border-orange-500 text-orange-400'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                    {tab === 'reviews' && (
                      <span className="ml-2 text-sm">({product.reviews})</span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {activeTab === 'description' && (
                <div className="max-w-4xl">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <div>
                    <h3 className="text-white font-semibold text-xl mb-4">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-gray-300">
                          <Check className="text-orange-400 flex-shrink-0" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="max-w-4xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-700">
                        <span className="font-medium text-gray-300">{key}:</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="max-w-4xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Customer Reviews</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className={`${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                          <span className="text-yellow-400 font-bold text-xl ml-2">{product.rating}</span>
                        </div>
                        <span className="text-gray-400">Based on {product.reviews} reviews</span>
                      </div>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                      <MessageCircle size={18} />
                      Write Review
                    </button>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-white">{review.name}</h4>
                              {review.verified && (
                                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                  <Check size={12} />
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={`${
                                      i < review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-gray-400 text-sm">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Size Guide Modal */}
          {showSizeGuide && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Size Guide</h3>
                  <button
                    onClick={() => setShowSizeGuide(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="font-semibold text-gray-300">Size</div>
                    <div className="font-semibold text-gray-300">Chest</div>
                    <div className="font-semibold text-gray-300">Length</div>
                    <div className="font-semibold text-gray-300">Shoulder</div>

                    <div className="text-gray-400">XS</div>
                    <div className="text-gray-400">34"</div>
                    <div className="text-gray-400">26"</div>
                    <div className="text-gray-400">16"</div>

                    <div className="text-gray-400">S</div>
                    <div className="text-gray-400">36"</div>
                    <div className="text-gray-400">27"</div>
                    <div className="text-gray-400">17"</div>

                    <div className="text-gray-400">M</div>
                    <div className="text-gray-400">38"</div>
                    <div className="text-gray-400">28"</div>
                    <div className="text-gray-400">18"</div>

                    <div className="text-gray-400">L</div>
                    <div className="text-gray-400">40"</div>
                    <div className="text-gray-400">29"</div>
                    <div className="text-gray-400">19"</div>

                    <div className="text-gray-400">XL</div>
                    <div className="text-gray-400">42"</div>
                    <div className="text-gray-400">30"</div>
                    <div className="text-gray-400">20"</div>
                  </div>
                  <p className="text-sm text-gray-400">
                    All measurements are in inches. For best fit, measure yourself and compare with the size chart.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}