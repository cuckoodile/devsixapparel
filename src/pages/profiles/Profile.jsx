import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  ShoppingBag
} from 'lucide-react';
import useGetProfiles from '../../api/hooks/users/useGetProfilesID';
import useUpdateProfile from '../../api/hooks/users/usePatchProfile';
import Purchases from './Purchases';

export default function UserProfile() {
  const { id } = useParams();
  const [ OpenModal, setOpenModal] = useState(false);
  const [editProfile, setEditProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    profile_image: '',
    region: '',
    province: '',
    city: '',
    barangay: '',
    house_address: '',
    zip_code: ''
  });
  const updateProfile = useUpdateProfile();

  // Prefill modal with current profile data when opening
  const handleOpenModal = () => {
    setEditProfile({
      first_name: profile.first_name || '',
      last_name: profile.last_name || '',
      email: profile.email || '',
      contact_number: profile.contact_number || '',
      profile_image: profile.profile_image || '',
      region: profile.region === 'Not provided' ? '' : profile.region,
      province: profile.province === 'Not provided' ? '' : profile.province,
      city: profile.city === 'Not provided' ? '' : profile.city,
      barangay: profile.barangay === 'Not provided' ? '' : profile.barangay,
      house_address: profile.house_address === 'Not provided' ? '' : profile.house_address,
      zip_code: profile.zip_code === 'Not provided' ? '' : profile.zip_code
    });
    setOpenModal(true);
  };

  const handleEditChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('user');
    updateProfile.mutate(
      { id, data: editProfile, token },
      {
        onSuccess: () => setOpenModal(false),
      }
    );
  };

  // const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const { data: userData, isLoading, isError, error } = useGetProfiles(id);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading user profile...</div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="h-screen w-screen bg-gray-900 flex flex-col items-center justify-center text-red-400 text-xl p-4">
        <p>Error: {error?.message || 'Failed to load user data'}</p>
        <p className="text-gray-400 text-base mt-2">Please check the user ID or try again later.</p>
      </div>
    );
  }

  // Handle case when no user data is found
  if (!userData) {
    return (
      <div className="h-screen w-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">No user data available.</div>
      </div>
    );
  }

  // Extract profile data
  const profile = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    contact_number: userData.contact_number,
    profile_image: userData.profile_image,
    created_at: userData.created_at,
    updated_at: userData.updated_at,
    region: userData.region || "Not provided",
    province: userData.province || "Not provided",
    city: userData.city || "Not provided",
    barangay: userData.barangay || "Not provided",
    house_address: userData.house_address || "Not provided",
    zip_code: userData.zip_code || "Not provided"
  };

  // Extract orders data
  // const orders = userData.orders || [];

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
        className={`flex items-center gap-3 w-full p-4 rounded-lg text-left transition-colors duration-300 ${isActive ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
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
              src={profile.profile_image || "https://via.placeholder.com/150"}
              alt={`${profile.first_name} ${profile.last_name}`}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-orange-500 shadow-lg object-cover mb-4 sm:mb-0 sm:mr-6"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {profile.first_name} {profile.last_name}
              </h1>
              <p className="text-gray-300 text-lg font-medium mt-1">
                Your Personal Space
              </p>
              <div className="flex items-center text-gray-400 text-sm mt-2">
                <Calendar size={16} className="mr-2" /> Member Since: {formatDate(profile.created_at)}
              </div>
              <div className="flex items-center text-gray-400 text-sm mt-1">
                <Clock size={16} className="mr-2" /> Last Login: {formatDateTime(profile.updated_at)}
              </div>
            </div>
          </div>
          <button
            className="mt-6 sm:mt-0 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 flex items-center gap-2"
            onClick={handleOpenModal}
          >
            <Edit2 size={20} /> Edit Profile
          </button>
        </div>
      </div>

      {/* create edit modal */}
      {OpenModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-4"
        onSubmit={handleEditSubmit}
      >
        <h2 className="text-xl font-bold text-white mb-4">Edit Profile</h2>
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          name="first_name"
          value={editProfile.first_name}
          onChange={handleEditChange}
          placeholder="First Name"
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          name="last_name"
          value={editProfile.last_name}
          onChange={handleEditChange}
          placeholder="Last Name"
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          name="email"
          value={editProfile.email}
          onChange={handleEditChange}
          placeholder="Email"
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          name="contact_number"
          value={editProfile.contact_number}
          onChange={handleEditChange}
          placeholder="Phone"
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          name="region"
          value={editProfile.region}
          onChange={handleEditChange}
          placeholder="Region"
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          name="province"
          value={editProfile.province}
          onChange={handleEditChange}
          placeholder="Province"
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          name="city"
          value={editProfile.city}
          onChange={handleEditChange}
          placeholder="City"
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          name="barangay"
          value={editProfile.barangay}
          onChange={handleEditChange}
          placeholder="Barangay"
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          name="house_address"
          value={editProfile.house_address}
          onChange={handleEditChange}
          placeholder="House Address"
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          name="zip_code"
          value={editProfile.zip_code}
          onChange={handleEditChange}
          placeholder="Zip Code"
        />
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-orange-600 px-4 py-2 rounded text-white font-semibold"
            disabled={updateProfile.isLoading}
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-600 px-4 py-2 rounded text-white"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
        </div>
        {updateProfile.isError && (
          <div className="text-red-400 mt-2">{updateProfile.error?.message}</div>
        )}
      </form>
    </div>
  )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-80 flex-shrink-0 bg-gray-800 p-6 shadow-xl border-r border-gray-700 overflow-y-auto">
          <nav className="space-y-4">
            <TabButton icon={<Briefcase size={24} />} label="Dashboard" tabName="dashboard" />
            <TabButton icon={<ShoppingBag size={24} />} label="Purchases" tabName="purchases" />
            <TabButton icon={<Settings size={24} />} label="Settings" tabName="settings" />
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
                  <p className="flex items-center gap-2"><Phone size={18} className="text-gray-400" /> {profile.contact_number}</p>
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
                    <p className="mb-1">{profile.house_address}</p>
                    <p className="mb-1">{profile.barangay}, {profile.city}, {profile.province}, {profile.region}</p>
                    <p>{profile.zip_code}</p>
                  </address>
                  <button className="mt-4 text-blue-400 hover:underline flex items-center text-sm">
                    Manage Addresses <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab Content */}
          {activeTab === 'purchases' && (
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 shadow-xl h-full">
              <Purchases />
            </div>
          )}

          {/* Settings Tab Content */}
          {activeTab === 'settings' && (
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 shadow-xl h-full">
              <h2 className="text-2xl sm:text-3xl font-bold text-orange-400 mb-6 flex items-center gap-3">
                <Settings size={28} /> Account Settings
              </h2>
              <div className="space-y-6 text-gray-300">
                {/* Password Change Button */}
                <button className="w-full flex items-center justify-between px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300">
                  <span>Change Password</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}