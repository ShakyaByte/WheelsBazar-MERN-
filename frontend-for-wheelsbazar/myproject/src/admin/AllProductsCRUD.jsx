import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productid: "",
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const id = "mods"; 
      const response = await axios.get(`http://localhost:5500/admin/categories/all/${id}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Current editMode:", editMode); // Debug editMode
    console.log("Current editId:", editId); // Debug editId
    console.log("Submitting form data:", formData); // Debug form data

    try {
      if (editMode) {
        console.log(`Sending PUT request to /admin/update/${editId}`);
        const response = await axios.put(`http://localhost:5500/admin/categories/update/${editId}`,formData );
        console.log("Update response:", response.data);
        setEditMode(false);
        setEditId(null);
      } else {
        console.log("Sending POST request to /admin/add");
        await axios.post("http://localhost:5500/admin/categories/add", formData);
      }
      setFormData({
        productid: "",
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
      fetchProducts();
    } catch (error) {
      console.error("Failed to submit product:", error.response?.data || error.message);
    }
  };

  const handleEdit = (product) => {
    console.log("Editing product with _id:", product._id);
    setFormData({
      productid: product.productid,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
    setEditMode(true);
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting product with ID:", id);
      await axios.delete(`http://localhost:5500/admin/categories/delete/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      <div className="flex justify-center">
        <div className="w-[90%] max-w-4xl">
          <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="productid"
                placeholder="Product ID (e.g., Helmets, Mods, Jackets)"
                value={formData.productid}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price ($)"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-30"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-13"
                required
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition duration-300 cursor-pointer"
              >
                {editMode ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="overflow-y-auto bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain rounded-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-blue-600 font-bold mt-2">${product.price}</p>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;