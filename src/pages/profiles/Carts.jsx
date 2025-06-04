import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Trash2, ChevronRight } from "lucide-react";
<<<<<<< HEAD
import Popup1 from "../../components/modals/Popup1";
=======
import useGetCarts from "../../api/hooks/carts/useGetcarts";
>>>>>>> 593332ca7f0478112dc607b3cbebb11896d88e9c

export default function Carts() {
  const { data: cartsData, isLoading, isError } = useGetCarts();
  // const paramsId = useParams().id;
  const [cartItems, setCartItems] = useState([]);
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
=======
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
>>>>>>> 593332ca7f0478112dc607b3cbebb11896d88e9c

  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);

<<<<<<< HEAD
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock cart data with Philippine fashion items
        const mockCart = {
          1: [
            {
              id: "item001",
              name: "Barong Tagalog (Piña Fabric)",
              price: 4500.0,
              quantity: 1,
              image:
                "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
            },
            {
              id: "item002",
              name: "Terno Dress (Modern Filipiniana)",
              price: 6500.0,
              quantity: 1,
              image:
                "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
            },
            {
              id: "item003",
              name: "Handwoven Banig Clutch",
              price: 1200.0,
              quantity: 2,
              image:
                "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
            },
          ],
        };
=======
  //       await new Promise((resolve) => setTimeout(resolve, 800));

  //       // Mock cart data with Philippine fashion items
  //       const mockCart = {
  //         2: [
  //           {
  //             id: "item001",
  //             name: "Barong Tagalog (Piña Fabric)",
  //             price: 4500.0,
  //             quantity: 1,
  //             image:
  //               "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //           },
  //           {
  //             id: "item002",
  //             name: "Terno Dress (Modern Filipiniana)",
  //             price: 6500.0,
  //             quantity: 1,
  //             image:
  //               "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //           },
  //           {
  //             id: "item003",
  //             name: "Handwoven Banig Clutch",
  //             price: 1200.0,
  //             quantity: 2,
  //             image:
  //               "https://i.pinimg.com/736x/85/12/9a/85129abc5df4216050f354b8188861a3.jpg",
  //           },
  //         ],
  //       };
>>>>>>> 593332ca7f0478112dc607b3cbebb11896d88e9c

  //       const data = mockCart[paramsId] || [];

<<<<<<< HEAD
        setCartItems(data);
      } catch (err) {
        setError("Failed to load cart data.");
        console.error("Error fetching cart data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (paramsId) {
      fetchCartData();
    } else {
      setLoading(false);
      setError("No user ID provided.");
    }
  }, [paramsId]);
=======
  //       setCartItems(data);
  //     } catch (err) {
  //       setError("Failed to load cart data.");
  //       console.error("Error fetching cart data:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (paramsId) {
  //     fetchCartData();
  //   } else {
  //     setLoading(false);
  //     setError("No user ID provided.");
  //   }
  // }, [paramsId]);
>>>>>>> 593332ca7f0478112dc607b3cbebb11896d88e9c

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.12; // Assuming 12% tax rate
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  if (isLoading) {
    return <h1>Loading Cart...</h1>;
  }

<<<<<<< HEAD
  if (error) {
    return (
      <div className="h-screen w-screen bg-gray-900 flex flex-col items-center justify-center text-red-400 text-xl p-4">
        <p>Error: {error}</p>
        <p className="text-gray-400 text-base mt-2">
          Please check the user ID or try again later.
        </p>
      </div>
    );
=======
  if (isError) {
    return <h1>Error Loading Cart</h1>;
>>>>>>> 593332ca7f0478112dc607b3cbebb11896d88e9c
  }

  return (
    <div className="h-full w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
      {/* Checkout Modal */}
      {isCheckoutVisible && <Popup1 visibility={setIsCheckoutVisible} />}

      {/* Cart Header */}
      <div className="flex-shrink-0 bg-gray-800 p-6 shadow-xl border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart size={28} className="text-orange-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Your Cart
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-gray-800 rounded-lg p-6 sm:p-8 shadow-xl h-full">
          {cartItems.length > 0 ? (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
<<<<<<< HEAD
                {cartItems.map((item) => (
=======
                {cartsData?.map((item) => (
>>>>>>> 593332ca7f0478112dc607b3cbebb11896d88e9c
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover border border-gray-600"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="text-gray-300">
                        ₱{item.price.toFixed(2)} each
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-gray-600 rounded hover:bg-gray-500 text-white"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-gray-300">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-600 rounded hover:bg-gray-500 text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-300 font-semibold">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-2 text-red-400 hover:text-red-300 flex items-center text-sm"
                      >
                        <Trash2 size={18} className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="p-5 bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₱{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (12%)</span>
                    <span>₱{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-white border-t border-gray-600 pt-2 mt-2">
                    <span>Total</span>
                    <span>₱{total.toFixed(2)}</span>
                  </div>
                </div>
                <button onClick={() => setIsCheckoutVisible(true)} className="w-full mt-4 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center gap-2">
                  Proceed to Checkout <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-lg">
              Your Filipiniana cart is empty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
