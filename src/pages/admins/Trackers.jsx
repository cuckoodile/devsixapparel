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
              )
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
      case 'ordered': return <Clock className="w-4 h-4 text-blue-500" />
      case 'processing': return <Package className="w-4 h-4 text-yellow-500" />
      case 'shipped': return <Truck className="w-4 h-4 text-purple-500" />
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'ordered': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
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
    <div className="min-h-screen w-290 g-gray-50">
      <div className="h-screen flex flex-col">
        <div className="bg-white shadow-sm border-b px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">DevSix Apparel</h1>
              <p className="text-gray-600">Order Tracking Dashboard</p>
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
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              {/* Status Filter */}
              <div className="relative">
                <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent appearance-none bg-white"
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
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Ordered</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.filter(o => o.status === 'ordered').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Processing</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.filter(o => o.status === 'processing').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Truck className="w-8 h-8 text-purple-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Shipped</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.filter(o => o.status === 'shipped').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Delivered</p>
                    <p className="text-2xl font-bold text-gray-900">
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
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Order Header */}
              <div className="bg-black text-white px-6 py-4">
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
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Tracking Number</p>
                      <p className="font-medium">{order.trackingNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Delivery Address</p>
                      <p className="font-medium">{order.shippingAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Items Ordered</h3>
                  <div className="space-y-3">
                    {order.products.map(product => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
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
                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                              >
                                <option value="ordered">Ordered</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                              </select>
                              <button
                                onClick={() => updateProductStatus(order.id, product.id)}
                                className="px-3 py-1 bg-black text-white text-xs rounded hover:bg-gray-800"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingProduct(null)}
                                className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
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
                                className="p-1 text-gray-400 hover:text-gray-600"
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
                  <h3 className="text-lg font-semibold mb-4">Order Timeline</h3>
                  <div className="space-y-4">
                    {order.timeline.map((step, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {getStatusIcon(step.status)}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.description}
                          </p>
                          {step.date && (
                            <p className="text-sm text-gray-500">
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