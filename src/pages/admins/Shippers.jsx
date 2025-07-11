import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function Shippers() {
  const [shippers, setShippers] = useState([
    { id: 1, name: 'LBC Express', contact: 'Maria Santos', phone: '+63-2-8631-8888', email: 'maria@lbc.ph', address: '1424 Quezon Ave, South Triangle, Quezon City, Metro Manila' },
    { id: 2, name: '2GO Express', contact: 'Juan dela Cruz', phone: '+63-2-8528-7000', email: 'juan@2go.com.ph', address: '2GO Building, 1357 A. Mabini St, Ermita, Manila' },
    { id: 3, name: 'JRS Express', contact: 'Ana Reyes', phone: '+63-2-8441-7333', email: 'ana@jrsexpress.com', address: 'JRS Building, 926 Aurora Blvd, Cubao, Quezon City' },
    { id: 4, name: 'Ninja Van Philippines', contact: 'Carlos Mendoza', phone: '+63-2-7747-0888', email: 'carlos@ninjavan.co', address: '8 Rockwell, Hidalgo Dr, Rockwell Center, Makati City' },
    { id: 5, name: 'DHL Philippines', contact: 'Sofia Cruz', phone: '+63-2-8818-9999', email: 'sofia@dhl.com', address: 'DHL Building, 110 Gamboa St, Legaspi Village, Makati City' }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShipper, setEditingShipper] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    address: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      contact: '',
      phone: '',
      email: '',
      address: ''
    });
  };

  const handleCreate = () => {
    setEditingShipper(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (shipper) => {
    setEditingShipper(shipper);
    setFormData({ ...shipper });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this shipper?')) {
      setShippers(shippers.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.contact || !formData.phone || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingShipper) {
      // Update existing shipper
      setShippers(shippers.map(s => 
        s.id === editingShipper.id ? { ...formData, id: editingShipper.id } : s
      ));
    } else {
      // Create new shipper
      const newShipper = {
        ...formData,
        id: Math.max(...shippers.map(s => s.id), 0) + 1
      };
      setShippers([...shippers, newShipper]);
    }

    setIsModalOpen(false);
    resetForm();
    setEditingShipper(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
    setEditingShipper(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Shipping Partners</h1>
          <p className="text-gray-400">Manage your shipping partners and their contact information</p>
        </div>

        {/* Add New Button */}
        <div className="mb-6">
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
          >
            <Plus size={20} />
            Add New Shipper
          </button>
        </div>

        {/* Shippers Table */}
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-750 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Shipper Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Contact Person
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {shippers.map((shipper) => (
                  <tr key={shipper.id} className="hover:bg-gray-750 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{shipper.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{shipper.contact}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{shipper.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-blue-400">{shipper.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300 max-w-xs truncate">{shipper.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(shipper)}
                          className="text-blue-400 hover:text-blue-300 p-2 rounded-md hover:bg-gray-700 transition-all duration-150"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(shipper.id)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-gray-700 transition-all duration-150"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {shippers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No shippers found. Add your first shipping partner!</p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 border border-gray-700 shadow-2xl">
              <h2 className="text-xl font-bold mb-4 text-white">
                {editingShipper ? 'Edit Shipper' : 'Add New Shipper'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Shipper Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter shipper name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter contact person name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., +63-2-8123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., contact@company.com.ph"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Complete address with barangay, city, and province"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
