import React, { useState } from 'react'
import { Package, Truck, CheckCircle, Clock, MapPin, Calendar, Edit3, Search, Filter } from 'lucide-react'

export default function Trackers() {
  const [orders, setOrders] = useState([
    {
      id: 'DS-001',
      customerName: 'Maria Santos',
      date: '2025-06-01',
      status: 'shipped',
      trackingNumber: 'PHL123456789',
      estimatedDelivery: '2025-06-05',
      shippingAddress: 'Quezon City, Metro Manila',
      products: [
        { id: 1, name: 'DevSix Oversized Tee - Black', size: 'L', quantity: 1, price: 899, status: 'shipped' },
        { id: 2, name: 'DevSix Logo Cap - Navy', quantity: 1, price: 599, status: 'shipped' }
      ],
      timeline: [
        { status: 'ordered', date: '2025-06-01 10:30', completed: true, description: 'Order placed' },
        { status: 'processing', date: '2025-06-01 14:20', completed: true, description: 'Payment confirmed & preparing items' },
        { status: 'shipped', date: '2025-06-02 09:15', completed: true, description: 'Out for delivery via LBC' },
        { status: 'delivered', date: '2025-06-05 16:00', completed: false, description: 'Package delivered' }
      ]
    },
    {
      id: 'DS-002', 
      customerName: 'Carlos Reyes',
      date: '2025-06-02',
      status: 'processing',
      trackingNumber: 'PHL987654321',
      estimatedDelivery: '2025-06-06',
      shippingAddress: 'Makati City, Metro Manila',
      products: [
        { id: 3, name: 'DevSix Streetwear Hoodie - Gray', size: 'M', quantity: 1, price: 1599, status: 'processing' },
        { id: 4, name: 'DevSix Cargo Shorts - Khaki', size: '32', quantity: 1, price: 1299, status: 'processing' }
      ],
      timeline: [
        { status: 'ordered', date: '2025-06-02 11:45', completed: true, description: 'Order placed' },
        { status: 'processing', date: '2025-06-02 15:30', completed: true, description: 'Payment confirmed & preparing items' },
        { status: 'shipped', date: '', completed: false, description: 'Out for delivery' },
        { status: 'delivered', date: '', completed: false, description: 'Package delivered' }
      ]
    },
    {
      id: 'DS-003',
      customerName: 'Ana Cruz',
      date: '2025-06-03',
      status: 'delivered',
      trackingNumber: 'PHL555777999',
      estimatedDelivery: '2025-06-03',
      shippingAddress: 'Pasig City, Metro Manila',
      products: [
        { id: 5, name: 'DevSix Vintage Wash Denim Jacket', size: 'S', quantity: 1, price: 2499, status: 'delivered' },
        { id: 6, name: 'DevSix Basic Tee - White', size: 'S', quantity: 2, price: 799, status: 'delivered' }
      ],
      timeline: [
        { status: 'ordered', date: '2025-06-01 09:00', completed: true, description: 'Order placed' },
        { status: 'processing', date: '2025-06-01 10:15', completed: true, description: 'Payment confirmed & preparing items' },
        { status: 'shipped', date: '2025-06-02 08:30', completed: true, description: 'Out for delivery via J&T Express' },
        { status: 'delivered', date: '2025-06-03 14:20', completed: true, description: 'Package delivered' }
      ]
    }
  ])

  const [editingProduct, setEditingProduct] = useState(null)
  const [editForm, setEditForm] = useState({ status: '' })
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const updateProductStatus = (orderId, productId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? {
              ...order,
              products: order.products.map(product =>
                product.id === productId
                  ? { ...product, status: editForm.status }
                  : product
              ),
              // Update order status based on product statuses
              status: order.products.every(p => p.status === editForm.status && p.id === productId ? editForm.status : p.status) ? editForm.status : order.status
            }
          : order
      )
    )
    setEditingProduct(null)
    setEditForm({ status: '' })
  }

  const startEditing = (product) => {
    setEditingProduct(product.id)
    setEditForm({ status: product.status })
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'ordered': return <Clock className="w-4 h-4 text-blue-400" />
      case 'processing': return <Package className="w-4 h-4 text-yellow-400" />
      case 'shipped': return <Truck className="w-4 h-4 text-purple-400" />
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-400" />
      default: return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'ordered': return 'bg-blue-900 text-blue-200'
      case 'processing': return 'bg-yellow-900 text-yellow-200'
      case 'shipped': return 'bg-purple-900 text-purple-200'
      case 'delivered': return 'bg-green-900 text-green-200'
      default: return 'bg-gray-700 text-gray-200'
    }
  }

  // Filter orders based on status and search query
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen w-290 bg-gray-900">
      <div className="h-screen flex flex-col">
        <div className="bg-gray-800 shadow-sm border-b border-gray-700 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-100">DevSix Apparel</h1>
              <p className="text-gray-400">Order Tracking Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, customers, or tracking..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-600 bg-gray-700 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200"
                />
              </div>
              
              {/* Status Filter */}
              <div className="relative">
                <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-200"
                >
                  <option value="all">All Orders</option>
                  <option value="ordered">Ordered</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
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
                  <Clock className="w-8 h-8 text-blue-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-400">Ordered</p>
                    <p className="text-2xl font-bold text-gray-100">
                      {orders.filter(o => o.status === 'ordered').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-yellow-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-400">Processing</p>
                    <p className="text-2xl font-bold text-gray-100">
                      {orders.filter(o => o.status === 'processing').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
                <div className="flex items-center">
                  <Truck className="w-8 h-8 text-purple-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-400">Shipped</p>
                    <p className="text-2xl font-bold text-gray-100">
                      {orders.filter(o => o.status === 'shipped').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-400">Delivered</p>
                    <p className="text-2xl font-bold text-gray-100">
                      {orders.filter(o => o.status === 'delivered').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Grid */}
            <div className="space-y-6">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-100 mb-2">No orders found</h3>
                  <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div key={order.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                    {/* Order Header */}
                    <div className="bg-blue-900 text-white px-6 py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-bold">Order {order.id}</h2>
                          <p className="text-gray-300">{order.customerName}</p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Order Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-400">Order Date</p>
                            <p className="font-medium text-gray-100">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-400">Tracking Number</p>
                            <p className="font-medium text-gray-100">{order.trackingNumber}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-400">Delivery Address</p>
                            <p className="font-medium text-gray-100">{order.shippingAddress}</p>
                          </div>
                        </div>
                      </div>

                      {/* Products */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-100">Items Ordered</h3>
                        <div className="space-y-3">
                          {order.products.map(product => (
                            <div key={product.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-100">{product.name}</h4>
                                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                                  {product.size && <span>Size: {product.size}</span>}
                                  <span>Qty: {product.quantity}</span>
                                  <span>₱{product.price.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                {editingProduct === product.id ? (
                                  <div className="flex items-center space-x-2">
                                    <select 
                                      value={editForm.status}
                                      onChange={(e) => setEditForm({ status: e.target.value })}
                                      className="px-2 py-1 border border-gray-600 bg-gray-700 rounded text-sm text-gray-200"
                                    >
                                      <option value="ordered">Ordered</option>
                                      <option value="processing">Processing</option>
                                      <option value="shipped">Shipped</option>
                                      <option value="delivered">Delivered</option>
                                    </select>
                                    <button
                                      onClick={() => updateProductStatus(order.id, product.id)}
                                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditingProduct(null)}
                                      className="px-3 py-1 bg-gray-600 text-gray-200 text-xs rounded hover:bg-gray-500"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                      {getStatusIcon(product.status)}
                                      <span className="ml-1 capitalize">{product.status}</span>
                                    </span>
                                    <button
                                      onClick={() => startEditing(product)}
                                      className="p-1 text-gray-400 hover:text-gray-200"
                                      title="Update status"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Timeline */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-100">Order Timeline</h3>
                        <div className="space-y-4">
                          {order.timeline.map((step, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                                step.completed ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-400'
                              }`}>
                                {getStatusIcon(step.status)}
                              </div>
                              <div className="flex-1">
                                <p className={`font-medium ${step.completed ? 'text-gray-100' : 'text-gray-400'}`}>
                                  {step.description}
                                </p>
                                {step.date && (
                                  <p className="text-sm text-gray-400">
                                    {new Date(step.date).toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}