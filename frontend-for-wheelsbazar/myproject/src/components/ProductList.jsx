import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (selectedCategory) => {
    setLoading(true);
    try {
      const url =
        selectedCategory === "All"
          ? "http://localhost:5500/product/my-products"
          : `http://localhost:5500/product/my-products?category=${selectedCategory}`;

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  const renderProducts = (products) =>
    products.map((product) => (
      <div
        key={product._id}
        className="bg-white rounded-lg shadow-md overflow-hidden p-2 w-full cursor-pointer hover:[box-shadow:0px_0px_9px_1.5px_rgba(0,0,0,0.5)]"
      >
        <img
          src={product.images[0] || "https://via.placeholder.com/300"}
          alt={product.title}
          className="w-full h-65 object-contain"
        />
        <div className="p-4">
          <h3 className="text-2xl font-semibold text-gray-800">{product.title}</h3>
          <p className="text-gray-600 text-md line-clamp-2">{product.description}</p>
          <p className="mt-2 text-md text-gray-600">Year: {product.year}</p>
          <p className="mt-2 text-md text-gray-600">Condition: {product.condition}</p>
          <p className="mt-2 text-md text-gray-600">Location: {product.location}</p>
          <p className="mt-2 text-md text-gray-600">Recent Owners: {product.owners}</p>
          <p className="mt-2 text-md text-gray-600">Phone No: {product.contact}</p>
          <p className="mt-2 text-lg font-semibold text-blue-900">Price: रु {product.price}</p>
        </div>
      </div>
    ));

  const categories = ["All", "Vehicle", "Gears", "Bikeparts", "Modifications", "Maintenance"];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-full mx-auto px-4 md:px-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">USED PRODUCTS</h2>

        {/* Category Filter Buttons */}
        <div className="flex justify-center mb-8 space-x-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-white font-semibold ${
                category === cat ? "bg-blue-700" : "bg-gray-500"
              } hover:bg-blue-600 transition`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {renderProducts(products)}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
