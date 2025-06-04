import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Edit2,
  Calendar,
  Clock,
  Briefcase,
  ChevronRight,
  ShoppingBag,
  Key
} from 'lucide-react';

export default function UserProfile() {
  const userId = '1'; 
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock user data with order history
        const mockUsers = {
          '1': {
            profile: {
              firstName: "Juan",
              lastName: "Dela Cruz",
              email: "juan.delacruz@example.com",
              phone: "+63 920 123 4567",
              avatar: "https://randomuser.me/api/portraits/men/75.jpg",
              address: {
                street: "123 Mabuhay Street",
                city: "Quezon City",
                province: "Metro Manila",
                zip: "1100",
                country: "Philippines"
              },
              joinedDate: "2025-03-15",
              lastLogin: "2025-06-02T10:30:00Z"
            },
            settings: {
              newsletterSubscription: true,
              notificationPreferences: {
                orderUpdates: true,
                promotions: false,
                wishlistAlerts: true
              }
            },
            orders: [
              {
                orderId: "ORD001",
                date: "2025-05-20T14:25:00Z",
                total: 2599.99,
                status: "Delivered",
                items: [
                  { name: "Wireless Headphones", quantity: 1, price: 1999.99 },
                  { name: "Phone Case", quantity: 2, price: 300.00 }
                ]
              },
              {
                orderId: "ORD002",
                date: "2025-04-15T09:10:00Z",
                total: 799.99,
                status: "Processing",
                items: [
                  { name: "USB-C Cable", quantity: 3, price: 266.66 }
                ]
              }
            ]
          }
        };

        const data = mockUsers[userId];

        if (data) {
          setUserData(data);
        } else {
          setError("User not found.");
        }
      } catch (err) {
        setError("Failed to load user data.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      setLoading(false);
      setError("No user ID provided.");
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading user profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen bg-gray-900 flex flex-col items-center justify-center text-red-400 text-xl p-4">
        <p>Error: {error}</p>
        <p className="text-gray-400 text-base mt-2">Please check the user ID or try again later.</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="h-screen w-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">No user data available.</div>
      </div>
    );
  }

  const { profile, settings, orders } = userData;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const TabButton = ({ icon, label, tabName }) => {
    const isActive = activeTab === tabName;
    return (
      <button
        onClick={() => setActiveTab(tabName)}
        className={`flex items-center gap-3 w-full p-4 rounded-lg text-left transition-colors duration-300 ${
          isActive
            ? 'bg-orange-600 text-white shadow-lg'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        {icon} <span className="font-medium text-lg">{label}</span>
      </button>
    );
  };

  return (
    <div className="h-screen w-screen bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
      {/* Profile Header */}
      <div className="flex-shrink-0 bg-gray-800 p-6 shadow-xl border-b border-gray-700">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between">
          <div className="flex items-center flex-col sm:flex-row text-center sm:text-left">
            <img
              src={profile.avatar}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-orange-500 shadow-lg object-cover mb-4 sm:mb-0 sm:mr-6"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-gray-300 text-lg font-medium mt-1">
                Your Personal Space
              </p>
              <div className="flex items-center text-gray-400 text-sm mt-2">
                <Calendar size={16} className="mr-2" /> Member Since: {formatDate(profile.joinedDate)}
              </div>
              <div className="flex items-center text-gray-400 text-sm mt-1">
                <Clock size={16} className="mr-2" /> Last Login: {formatDateTime(profile.lastLogin)}
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3">
            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 flex items-center gap-2">
              <Edit2 size={20} /> Edit Profile
            </button>
            <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 flex items-center gap-2">
              <Key size={20} /> Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-80 flex-shrink-0 bg-gray-800 p-6 shadow-xl border-r border-gray-700 overflow-y-auto">
          <nav className="space-y-4">
            <TabButton icon={<Briefcase size={24} />} label="Dashboard" tabName="dashboard" />
            <TabButton icon={<ShoppingBag size={24} />} label="Order History" tabName="orders" />
            <button className="flex items-center gap-3 w-full p-4 rounded-lg text-left text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-300 mt-6">
              <LogOut size={24} /> <span className="font-medium text-lg">Logout</span>
            </button>
          </nav>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Dashboard Tab Content */}
          {activeTab === 'dashboard' && (
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 shadow-xl h-full">
              <h2 className="text-2xl sm:text-3xl font-bold text-orange-400 mb-6 flex items-center gap-3">
                <User size={28} /> Account Overview
              </h2>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 text-gray-300">
                {/* Contact Info Card */}
                <div className="p-5 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <Mail size={22} className="text-orange-400" /> Contact Information
                  </h3>
                  <p className="flex items-center gap-2 mb-2"><Mail size={18} className="text-gray-400" /> {profile.email}</p>
                  <p className="flex items-center gap-2"><Phone size={18} className="text-gray-400" /> {profile.phone}</p>
                  <button className="mt-4 text-blue-400 hover:underline flex items-center text-sm">
                    Update Contact <ChevronRight size={16} />
                  </button>
                </div>

                {/* Shipping Address Card */}
                <div className="p-5 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <MapPin size={22} className="text-orange-400" /> Default Shipping Address
                  </h3>
                  <address className="not-italic text-gray-300">
                    <p className="mb-1">{profile.address.street}</p>
                    <p className="mb-1">{profile.address.city}, {profile.address.province} {profile.address.zip}</p>
                    <p>{profile.address.country}</p>
                  </address>
                  <button className="mt-4 text-blue-400 hover:underline flex items-center text-sm">
                    Manage Addresses <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab Content */}
          {activeTab === 'orders' && (
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 shadow-xl h-full">
              <h2 className="text-2xl sm:text-3xl font-bold text-orange-400 mb-6 flex items-center gap-3">
                <ShoppingBag size={28} /> Order History
              </h2>
              <div className="space-y-6 text-gray-300">
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <div key={order.orderId} className="p-5 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-semibold text-white">Order #{order.orderId}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'Delivered'
                              ? 'bg-green-600 text-white'
                              : 'bg-yellow-600 text-white'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="flex items-center gap-2 mb-2">
                        <Calendar size={18} className="text-gray-400" /> Ordered on: {formatDate(order.date)}
                      </p>
                      <p className="flex items-center gap-2 mb-4">
                        <span className="font-semibold">Total:</span> ₱{order.total.toFixed(2)}
                      </p>
                      <div className="border-t border-gray-600 pt-3">
                        <h4 className="text-lg font-semibold text-white mb-2">Items</h4>
                        <ul className="space-y-2">
                          {order.items.map((item, index) => (
                            <li key={index} className="flex justify-between">
                              <span>{item.quantity}x {item.name}</span>
                              <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="mt-4 text-blue-400 hover:underline flex items-center text-sm">
                        View Details <ChevronRight size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No orders found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}