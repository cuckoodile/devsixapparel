import { useEffect, useRef, useState } from "react";
import usePostProduct from "../../api/hooks/products/usePostProduct";

const specificationName = ["Gender", "Material", "Brand", "Model"];
const categories = [
  "Pants",
  "Shoes",
  "Shirt",
  "T-Shirt",
  "Shorts",
  "Hats",
  "Socks",
  "Slacks",
  "Sunglasses",
  "Necklace",
];
const size = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "US:6",
  "US:6.5",
  "US:7",
  "US:7.5",
  "US:8",
  "US:8.5",
  "US:9",
  "US:9.5",
  "US:10",
  "US:10.5",
];
const color = [
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Black",
  "White",
  "Gold",
  "Silver",
  "Light Brown",
  "Dark Brown",
  "Stained Finishes",
];

export default function ProductModal({ visibility, data, action }) {
  const [selectedImage, setSelectedImage] = useState(
    data?.images?.[0]?.img || ""
  );

  if (action == "view") {
    return (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20">
        <button
          className="absolute bg-black/80 inset-0 w-full h-full"
          onClick={() => visibility(false)}
        />

        <div className="bg-white flex flex-col p-6 rounded-2xl shadow-lg relative z-10 max-h-[90%] w-[60%] overflow-y-auto">
          <div className="my-5 text-center">
            <h2 className="font-bold text-3xl">
              {data?.name || "Product Name"}
            </h2>
            <p className="text-gray-600">
              {data?.category?.name || "Category"}
            </p>
          </div>

          {data?.images?.length > 0 && (
            <div className="flex flex-col items-center mb-4 border-b pb-3">
              {/* Main Display Image */}
              <img
                src={selectedImage}
                alt={data.name}
                className="w-40 h-40 object-cover rounded-lg"
              />

              {/* Thumbnail Images */}
              <div className="flex gap-2 mt-2 w-full justify-center overflow-x-auto">
                {data.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.img}
                    alt={`${data.name} ${index + 1}`}
                    className="w-12 h-12 object-cover rounded-md cursor-pointer border"
                    onClick={() => setSelectedImage(image.img)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="text-left space-y-2">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {data?.category?.name || "No description available."}
            </p>

            <p>
              <span className="font-semibold">Description:</span>{" "}
              {data?.description || "No description available."}
            </p>

            <p>
              <span className="font-semibold">Price:</span> ₱
              {" " + data?.price || "N/A"}
            </p>

            <p>
              <span className="font-semibold">Stock:</span>{" "}
              {data?.stock || "N/A"} pcs
            </p>

            <p>
              <span className="font-semibold">Specifications:</span>
            </p>

            {(data?.colors?.length > 0 && (
              <p>
                <span className="font-semibold">Colors:</span>{" "}
                {data?.colors?.map((color) => color.color + ", ")}
              </p>
            )) ||
              null}

            {(data?.sizes?.length > 0 && (
              <p>
                <span className="font-semibold">Sizes:</span>{" "}
                {data?.sizes?.map((size) => size.size + ", ")}
              </p>
            )) ||
              null}

            <ul className="list-disc pl-5">
              {data?.specifications?.map((spec, index) => (
                <li key={index}>
                  {spec?.name?.name}: {spec?.value}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-500 pt-3 mt-3 flex justify-center">
            <button
              onClick={() => visibility(false)}
              className="p-2 border rounded-lg bg-red-500 text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  } else if (action == "create") {
    /////////////////////////////////////////////////////////////////
    const userToken = sessionStorage.getItem("user");
    const postProductMutation = usePostProduct(userToken, {
      onSuccess: (data) => {
        alert("Product created: ", data)
      },
      onError: (data) => {
        alert("Product creation error: ", data)
      }
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [formValues, setFormValues] = useState({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
    });
    const [specifications, setSpecifications] = useState([]);
    const [sizes, setSizes] = useState([""]);
    const [colors, setColors] = useState([""]);
    const fileInputRef = useRef(null);
    const formData = new FormData();

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    const handleImageChange = (e) => {
      const files = e.target.files;

      if (files) {
        formData.delete("images");
        const newPreviewImages = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          formData.append("images", file);
          newPreviewImages.push(URL.createObjectURL(file));
        }
        setPreviewImages(newPreviewImages);
      }
    };

    const triggerFileInput = () => {
      fileInputRef.current.click();
    };

    const removeImage = (index) => {
      const newPreviewImages = [...previewImages];
      URL.revokeObjectURL(newPreviewImages[index]);
      newPreviewImages.splice(index, 1);
      setPreviewImages(newPreviewImages);

      formData.delete("images");
      if (fileInputRef.current.files) {
        const files = Array.from(fileInputRef.current.files);
        files.splice(index, 1);
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        fileInputRef.current.files = dataTransfer.files;
        files.forEach((file) => formData.append("images", file));
      }
    };

    // Specification handlers
    const addSpecification = () => {
      setSpecifications([...specifications, { name: "", value: "" }]);
    };

    const removeSpecification = (index) => {
      const newSpecs = [...specifications];
      newSpecs.splice(index, 1);
      setSpecifications(newSpecs);
    };

    const handleSpecificationChange = (index, field, value) => {
      const newSpecs = [...specifications];
      newSpecs[index][field] = value;
      setSpecifications(newSpecs);
    };

    // Size handlers
    const handleSizeChange = (index, value) => {
      const newSizes = [...sizes];
      newSizes[index] = value;
      setSizes(newSizes);

      // Add new empty size field if last one has value
      if (index === sizes.length - 1 && value.trim() !== "") {
        setSizes([...newSizes, ""]);
      }
    };

    const removeSize = (index) => {
      if (sizes.length > 1) {
        const newSizes = [...sizes];
        newSizes.splice(index, 1);
        setSizes(newSizes);
      }
    };

    // Color handlers
    const handleColorChange = (index, value) => {
      const newColors = [...colors];
      newColors[index] = value;
      setColors(newColors);

      // Add new empty color field if last one has value
      if (index === colors.length - 1 && value.trim() !== "") {
        setColors([...newColors, ""]);
      }
    };

    const removeColor = (index) => {
      if (colors.length > 1) {
        const newColors = [...colors];
        newColors.splice(index, 1);
        setColors(newColors);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Create new FormData instance
      const submissionFormData = new FormData();

      // Add all form values
      Object.entries(formValues).forEach(([key, value]) => {
        submissionFormData.append(key, value);
      });

      // Add specifications
      specifications.forEach((spec, index) => {
        submissionFormData.append(`specifications[${index}][name]`, spec.name);
        submissionFormData.append(
          `specifications[${index}][value]`,
          spec.value
        );
      });

      // Add sizes (filter out empty strings)
      sizes
        .filter((size) => size.trim() !== "")
        .forEach((size, index) => {
          submissionFormData.append(`sizes[${index}]`, size);
        });

      // Add colors (filter out empty strings)
      colors
        .filter((color) => color.trim() !== "")
        .forEach((color, index) => {
          submissionFormData.append(`colors[${index}]`, color);
        });

      // Add images
      if (fileInputRef.current?.files) {
        Array.from(fileInputRef.current.files).forEach((file, index) => {
          submissionFormData.append(`images`, file);
        });
      }

      // Submit the form data
      try {
        await postProductMutation.mutateAsync(submissionFormData);
        visibility(false); // Close the modal on success
      } catch (error) {
        console.error("Error creating product:", error);
        // You might want to add error handling UI here
      }
    };

    return (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20">
        <button
          onClick={() => visibility(false)}
          className="absolute bg-black/80 inset-0 w-full h-full"
        />

        <div className="bg-white flex flex-col p-6 rounded-2xl shadow-lg relative z-10 max-h-[90%] w-[60%] overflow-y-auto">
          <button
            onClick={() => visibility(false)}
            className="absolute top-[2%] right-[3%] text-3xl font-bold bg-red-600 size-10 rounded-4xl cursor-pointer text-white flex items-center justify-center"
          >
            ×
          </button>

          <h2 className="font-extrabold text-2xl mb-6">Create New Product</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category*
                </label>
                <select
                  name="category"
                  value={formValues.category}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                >
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={index + 1}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price*
                </label>
                <input
                  type="number"
                  name="price"
                  value={formValues.price}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock*
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formValues.stock}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description*
              </label>
              <textarea
                name="description"
                rows={3}
                value={formValues.description}
                onChange={handleInputChange}
                required
                className="mt-1 block min-h-[15vh] w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>

            {/* Specifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specifications
              </label>
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4"
                >
                  <div>
                    <select
                      value={spec.name}
                      onChange={(e) =>
                        handleSpecificationChange(index, "name", e.target.value)
                      }
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    >
                      <option value="">Select specification</option>
                      {specificationName.map((name, i) => (
                        <option key={i} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2 flex gap-2">
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) =>
                        handleSpecificationChange(
                          index,
                          "value",
                          e.target.value
                        )
                      }
                      placeholder="Value"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      className="px-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addSpecification}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                + Add Specification
              </button>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sizes
              </label>
              {sizes.map((size, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => handleSizeChange(index, e.target.value)}
                    placeholder="Size"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  />
                  {sizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="px-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colors
              </label>
              {colors.map((color, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    placeholder="Color"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  />
                  {colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="px-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Select Images
              </button>
              {previewImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover rounded-md border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => visibility(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={postProductMutation.isLoading}
                className={`px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${
                  postProductMutation.isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {postProductMutation.isLoading
                  ? "Creating..."
                  : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
