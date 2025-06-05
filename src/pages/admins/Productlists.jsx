import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  X,
  Save,
  Package,
  Shirt,
  Tag,
  DollarSign,
} from "lucide-react";
import useGetProducts from "../../api/hooks/products/useGetProducts";
import useGetCategories from "../../api/hooks/categories/useGetCategories";
import ProductModal from "../../components/modals/ProductModal";

export default function Productlists() {
  const {
    data: products,
    isLoading: productLoading,
    isError: productError,
  } = useGetProducts();
  const {
    data: categories,
    isLoading: categoryLoading,
    usError: categoryError,
  } = useGetCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewModalOpen, setViewMOdalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  // Filter products
  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.color.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Out of Stock":
        return "bg-red-400 text-white";
      case "Very Low Stock":
        return "bg-red-100 text-white";
      case "Low Stock":
        return "bg-yellow-400 text-white";
      case "Good Stock":
        return "bg-green-300 text-white";
      default:
        return "bg-green-600 text-white";
    }
  };

  const getStatusText = (stock) => {
    if (stock <= 0) {
      return "Out of Stock";
    } else if (stock < 50) {
      return "Very Low Stock";
    } else if (stock <= 100) {
      return "Low Stock";
    } else if (stock <= 200) {
      return "Good Stock";
    } else {
      return "High Stock";
    }
  };

  function handleOpenModal(type, data) {
    setSelectedProduct(data);
    setModalType(type);
    setViewMOdalOpen(true);
  }

  return (
    <div className="h-[93vh] w-full relative">
      {/* Action Modals */}
      {(isViewModalOpen && (
        <ProductModal
          categories={categories}
          visibility={setViewMOdalOpen}
          action={modalType}
          data={selectedProduct}
        />
      )) ||
        null}

      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4 flex-shrink-0 sticky inset-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                DevSix Apparel
              </h1>
              <p className="text-gray-600">Product Management</p>
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
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>

              {/* Add Product Button */}
              <button
                onClick={() => handleOpenModal("create", null)}
                className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 h-full overflow-auto bg-blue-700 p-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      Total Products
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {products?.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Shirt className="w-8 h-8 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      Active Products
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {products?.filter((p) => p.status === "active")?.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Tag className="w-8 h-8 text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      Low Stock
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        products?.filter((p) => p.status === "low_stock")
                          ?.length
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-purple-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      Total Value
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₱
                      {products
                        ?.reduce((sum, p) => sum + p.price * p.stock, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts?.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No products found
                          </h3>
                          <p className="text-gray-500">
                            Try adjusting your search or filter criteria.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts?.map((product) => (
                        <tr key={product?.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                  <Shirt className="w-6 h-6 text-gray-500" />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {product?.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {/* {product.color} */}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product?.category.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₱{product?.price.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product?.stock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                product.status
                              )}`}
                            >
                              {getStatusText(product.stock)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              {/* Handle Action Buttons */}
                              <button
                                onClick={() => handleOpenModal("view", product)}
                                className="text-gray-600 hover:text-gray-900"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                // onClick={() => handleEdit(product)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                // onClick={() => handleDelete(product.id)}
                                className="text-red-600 hover:text-red-900"
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
    </div>
  );
}
