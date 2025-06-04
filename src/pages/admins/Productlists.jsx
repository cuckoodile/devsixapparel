import React, { useState } from 'react'
import { Plus, Search, Filter, Edit3, Trash2, Eye, X, Save, Package, Shirt, Tag, DollarSign } from 'lucide-react'

export default function Productlists() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'DevSix Oversized Tee',
      category: 'T-Shirts',
      price: 899,
      stock: 45,
      color: 'Black',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      description: 'Premium cotton oversized t-shirt with DevSix logo',
      status: 'active',
      dateAdded: '2025-05-15',
      image: '/api/placeholder/300/300'
    },
    {
      id: 2,
      name: 'DevSix Logo Cap',
      category: 'Accessories',
      price: 599,
      stock: 23,
      color: 'Navy',
      sizes: ['One Size'],
      description: 'Adjustable cap with embroidered DevSix logo',
      status: 'active',
      dateAdded: '2025-05-10',
      image: '/api/placeholder/300/300'
    },
    {
      id: 3,
      name: 'DevSix Streetwear Hoodie',
      category: 'Hoodies',
      price: 1599,
      stock: 12,
      color: 'Gray',
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Premium fleece hoodie with kangaroo pocket',
      status: 'active',
      dateAdded: '2025-05-08',
      image: '/api/placeholder/300/300'
    },
    {
      id: 4,
      name: 'DevSix Cargo Shorts',
      category: 'Bottoms',
      price: 1299,
      stock: 8,
      color: 'Khaki',
      sizes: ['28', '30', '32', '34', '36'],
      description: 'Multi-pocket cargo shorts with adjustable waist',
      status: 'low_stock',
      dateAdded: '2025-05-05',
      image: '/api/placeholder/300/300'
    },
    {
      id: 5,
      name: 'DevSix Vintage Wash Denim Jacket',
      category: 'Jackets',
      price: 2499,
      stock: 0,
      color: 'Blue',
      sizes: ['S', 'M', 'L'],
      description: 'Classic denim jacket with vintage wash finish',
      status: 'out_of_stock',
      dateAdded: '2025-04-28',
      image: '/api/placeholder/300/300'
    }
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create') // 'create', 'edit', 'view'
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    color: '',
    sizes: [],
    description: '',
    status: 'active'
  })

  const categories = ['T-Shirts', 'Hoodies', 'Jackets', 'Bottoms', 'Accessories']
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', 'One Size']

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.color.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // CRUD Operations
  const handleCreate = () => {
    setModalMode('create')
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      color: '',
      sizes: [],
      description: '',
      status: 'active'
    })
    setShowModal(true)
  }

  const handleEdit = (product) => {
    setModalMode('edit')
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      color: product.color,
      sizes: product.sizes,
      description: product.description,
      status: product.status
    })
    setShowModal(true)
  }

  const handleView = (product) => {
    setModalMode('view')
    setSelectedProduct(product)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const handleSave = () => {
    if (modalMode === 'create') {
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        dateAdded: new Date().toISOString().split('T')[0],
        image: '/api/placeholder/300/300'
      }
      setProducts([...products, newProduct])
    } else if (modalMode === 'edit') {
      setProducts(products.map(p => 
        p.id === selectedProduct.id 
          ? { 
              ...p, 
              ...formData,
              price: parseFloat(formData.price),
              stock: parseInt(formData.stock)
            }
          : p
      ))
    }
    setShowModal(false)
  }

  const handleSizeToggle = (size) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.includes(size)
        ? formData.sizes.filter(s => s !== size)
        : [...formData.sizes, size]
    })
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-900 text-green-200'
      case 'low_stock': return 'bg-yellow-900 text-yellow-200'
      case 'out_of_stock': return 'bg-red-900 text-red-200'
      default: return 'bg-gray-700 text-gray-200'
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'Active'
      case 'low_stock': return 'Low Stock'
      case 'out_of_stock': return 'Out of Stock'
      default: return status
    }
  }

  return (
    <div className="min-h-screen w-290 bg-gray-900">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 shadow-sm border-b border-gray-700 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-100">DevSix Apparel</h1>
              <p className="text-gray-400">Product Management</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-600 bg-gray-700 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200"
                />
              </div>
              
              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>

              {/* Add Product Button */}
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-blue-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-400">Total Products</p>
                    <p className="text-2xl font-bold text-gray-100">{products.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
                <div className="flex items-center">
                  <Shirt className="w-8 h-8 text-green-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-400">Active Products</p>
                    <p className="text-2xl font-bold text-gray-100">
                      {products.filter(p => p.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
                <div className="flex items-center">
                  <Tag className="w-8 h-8 text-yellow-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-400">Low Stock</p>
                    <p className="text-2xl font-bold text-gray-100">
                      {products.filter(p => p.status === 'low_stock').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-purple-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-400">Total Value</p>
                    <p className="text-2xl font-bold text-gray-100">
                      ₱{products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700 border-b border-gray-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-100 mb-2">No products found</h3>
                          <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map(product => (
                        <tr key={product.id} className="hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-lg bg-gray-600 flex items-center justify-center">
                                  <Shirt className="w-6 h-6 text-gray-400" />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-100">{product.name}</div>
                                <div className="text-sm text-gray-400">{product.color}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{product.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">₱{product.price.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">{product.stock}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                              {getStatusText(product.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleView(product)}
                                className="text-gray-400 hover:text-gray-200"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(product)}
                                className="text-blue-400 hover:text-blue-200"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="text-red-400 hover:text-red-200"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-100">
                {modalMode === 'create' && 'Add New Product'}
                {modalMode === 'edit' && 'Edit Product'}
                {modalMode === 'view' && 'Product Details'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {modalMode === 'view' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Product Name</label>
                    <p className="text-gray-100">{selectedProduct?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <p className="text-gray-100">{selectedProduct?.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Price</label>
                    <p className="text-gray-100">₱{selectedProduct?.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Stock</label>
                    <p className="text-gray-100">{selectedProduct?.stock}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Color</label>
                    <p className="text-gray-100">{selectedProduct?.color}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedProduct?.status)}`}>
                      {getStatusText(selectedProduct?.status)}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Available Sizes</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct?.sizes.map(size => (
                      <span key={size} className="px-2 py-1 bg-gray-700 text-gray-200 text-sm rounded">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                  <p className="text-gray-100">{selectedProduct?.description}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Product Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Price (₱) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Stock Quantity *</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Color *</label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                    >
                      <option value="active">Active</option>
                      <option value="low_stock">Low Stock</option>
                      <option value="out_of_stock">Out of Stock</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Available Sizes</label>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`px-3 py-1 rounded-lg text-sm border ${
                          formData.sizes.includes(size)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-700 text-gray-200 border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{modalMode === 'create' ? 'Create Product' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
