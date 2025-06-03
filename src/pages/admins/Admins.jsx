import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Users, Package, BarChart3, Settings, Eye, Star, TrendingUp, ShoppingBag, UserCheck, Calendar, Bell, Menu, X } from 'lucide-react'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('7days')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const salesData = [
    { day: 'Mon', sales: 12000, orders: 25 },
    { day: 'Tue', sales: 19000, orders: 35 },
    { day: 'Wed', sales: 15000, orders: 28 },
    { day: 'Thu', sales: 22000, orders: 42 },
    { day: 'Fri', sales: 28000, orders: 51 },
    { day: 'Sat', sales: 35000, orders: 68 },
    { day: 'Sun', sales: 31000, orders: 59 }
  ]

  const categoryData = [
    { name: 'Traditional', sales: 85000, percentage: 35, color: 'blue' },
    { name: 'Formal', sales: 72000, percentage: 30, color: 'purple' },
    { name: 'Casual', sales: 65000, percentage: 27, color: 'green' },
    { name: 'Accessories', sales: 19000, percentage: 8, color: 'orange' }
  ]

  const topCustomers = [
    { name: 'Maria Santos', orders: 24, spent: 45600, status: 'VIP' },
    { name: 'Juan dela Cruz', orders: 18, spent: 32400, status: 'Premium' },
    { name: 'Ana Reyes', orders: 15, spent: 28900, status: 'Regular' },
    { name: 'Carlos Mendoza', orders: 12, spent: 21300, status: 'Regular' },
    { name: 'Sofia Garcia', orders: 10, spent: 18750, status: 'Regular' }
  ]
  const products = [
    { id: 1, name: 'Filipiniana Dress', category: 'Traditional', price: 2500, stock: 15, status: 'Active', rating: 4.8, sales: 234 },
    { id: 2, name: 'Barong Tagalog', category: 'Formal', price: 3200, stock: 8, status: 'Active', rating: 4.9, sales: 198 },
    { id: 3, name: 'Modern Terno', category: 'Formal', price: 4500, stock: 5, status: 'Active', rating: 4.7, sales: 156 },
    { id: 4, name: 'Streetwear Tee', category: 'Casual', price: 850, stock: 32, status: 'Active', rating: 4.6, sales: 342 },
    { id: 5, name: 'Printed Polo', category: 'Casual', price: 1200, stock: 0, status: 'Out of Stock', rating: 4.5, sales: 289 }
  ]

  const renderReports = () => (
    <div className="space-y-8 h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">
            Detailed insights into your store's performance and trends.
          </p>
        </div>

      {/* Reports Section */}
      <div className="space-y-8 mt-12">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h2>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-white/80 text-sm font-medium">Total Revenue</h3>
              <p className="text-3xl font-bold mt-2">₱284,560</p>
              <p className="text-white/80 text-sm mt-2">+12.5% from last period</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Average Order Value</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">₱2,156</p>
              <p className="text-green-600 text-sm mt-2">+8.3% from last period</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">3.2%</p>
              <p className="text-green-600 text-sm mt-2">+0.5% from last period</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Customer Retention</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">68%</p>
              <p className="text-red-600 text-sm mt-2">-2.1% from last period</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Sales Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Sales Trend</h3>
              <div className="space-y-4">
                {salesData.map((day, index) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">₱{day.sales.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">{day.orders} orders</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(day.sales / 35000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Sales by Category</h3>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 bg-${category.color}-500 rounded-full`}></div>
                        <span className="text-sm font-medium text-gray-900">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">₱{category.sales.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{category.percentage}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${category.color}-500 h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Customers */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Top Customers</h3>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={customer.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">₱{customer.spent.toLocaleString()}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'VIP' ? 'bg-yellow-100 text-yellow-700' :
                        customer.status === 'Premium' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {customer.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Performance */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Product Performance</h3>
              <div className="space-y-4">
                {products
                  .sort((a, b) => b.sales - a.sales)
                  .map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{product.sales} sold</p>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-white/80 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">₱284,560</p>
          <p className="text-white/80 text-sm mt-2">+12.5% from last period</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Average Order Value</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">₱2,156</p>
          <p className="text-green-600 text-sm mt-2">+8.3% from last period</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">3.2%</p>
          <p className="text-green-600 text-sm mt-2">+0.5% from last period</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Customer Retention</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">68%</p>
          <p className="text-red-600 text-sm mt-2">-2.1% from last period</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Sales Trend</h3>
          <div className="space-y-4">
            {salesData.map((day, index) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">₱{day.sales.toLocaleString()}</span>
                    <span className="text-xs text-gray-500">{day.orders} orders</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(day.sales / 35000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Sales by Category</h3>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 bg-${category.color}-500 rounded-full`}></div>
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">₱{category.sales.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{category.percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-${category.color}-500 h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Customers */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Customers</h3>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={customer.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">₱{customer.spent.toLocaleString()}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'VIP' ? 'bg-gold-100 text-yellow-700' :
                    customer.status === 'Premium' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Product Performance</h3>
          <div className="space-y-4">
            {products
              .sort((a, b) => b.sales - a.sales)
              .map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{product.sales} sold</p>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue', gradient = false }) => (
    <div className={`${gradient ? `bg-gradient-to-br from-${color}-500 to-${color}-600 text-white` : 'bg-white'} rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${gradient ? 'text-white/80' : 'text-gray-500'} text-sm font-medium`}>{title}</p>
          <p className={`text-3xl font-bold ${gradient ? 'text-white' : 'text-gray-900'} mt-2`}>{value}</p>
          {change && (
            <div className={`inline-flex items-center gap-1 mt-3 px-2 py-1 rounded-full text-xs font-medium ${
              gradient 
                ? 'bg-white/20 text-white' 
                : change.startsWith('+') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
            }`}>
              <TrendingUp size={12} />
              {change}
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${gradient ? 'bg-white/20' : `bg-${color}-100`} transition-all duration-300`}>
          <Icon className={`${gradient ? 'text-white' : `text-${color}-600`}`} size={28} />
        </div>
      </div>
    </div>
  )

  const ActivityItem = ({ color, title, time, type = 'default' }) => (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className={`w-3 h-3 bg-${color}-500 rounded-full animate-pulse`}></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
        type === 'success' ? 'bg-green-100 text-green-700' :
        type === 'info' ? 'bg-blue-100 text-blue-700' :
        'bg-purple-100 text-purple-700'
      }`}>
        {type === 'success' ? 'Order' : type === 'info' ? 'Update' : 'New'}
      </div>
    </div>
  )

  const ProductCard = ({ product, index }) => (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full text-sm font-bold">
          {index + 1}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">{product.category}</span>
            <span className="text-xs text-gray-300">•</span>
            <span className="text-xs text-gray-500">{product.sales} sold</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-900">₱{product.price.toLocaleString()}</p>
        <div className="flex items-center gap-1 mt-1">
          <Star size={12} className="text-yellow-500 fill-current" />
          <span className="text-xs font-medium text-gray-600">{product.rating}</span>
          <div className={`ml-2 w-2 h-2 rounded-full ${
            product.stock > 10 ? 'bg-green-500' : 
            product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
        </div>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="space-y-5 h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 text-left">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {currentTime.toLocaleDateString('en-PH', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-xs text-gray-500">
              {currentTime.toLocaleTimeString('en-PH', { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="₱284,560"
          change="+12.5%"
          icon={BarChart3}
          color="green"
          gradient={true}
        />
        <StatCard
          title="Active Products"
          value="156"
          change="+8"
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Total Customers"
          value="1,247"
          change="+23"
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Orders Today"
          value="47"
          change="+18.2%"
          icon={ShoppingBag}
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500 font-medium">Live</span>
            </div>
          </div>
          <div className="space-y-4">
            <ActivityItem
              color="green"
              title="New order from Maria Santos"
              time="2 minutes ago"
              type="success"
            />
            <ActivityItem
              color="blue"
              title="Product 'Barong Tagalog' updated"
              time="15 minutes ago"
              type="info"
            />
            <ActivityItem
              color="purple"
              title="New customer registration"
              time="1 hour ago"
              type="new"
            />
            <ActivityItem
              color="orange"
              title="Inventory alert: Low stock on Modern Terno"
              time="2 hours ago"
              type="warning"
            />
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Top Selling Products</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {products
              .sort((a, b) => b.sales - a.sales)
              .slice(0, 4)
              .map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  )
}