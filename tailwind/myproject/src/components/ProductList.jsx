import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5500/product/my-products"); // Public API endpoint
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-full mx-15 px-0 md:mx-3 sm:mx-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center"> USED BIKES </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:mx-12 md:mx-10">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden p-2 w-full cursor-pointer hover:[box-shadow:0px_0px_9px_1.5px_rgba(0,0,0,0.5)]">
                <img
                  src={product.images[0] || "https://via.placeholder.com/300"}
                  alt={product.title}
                  className="w-full h-55 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{product.title}</h3>
                  <p className="text-gray-600 text-md line-clamp-2">{product.description}</p>
                  <p className="mt-2 text-md  text-gray-600"> Year: {product.year}</p>
                  <p className="mt-2 text-md  text-gray-600"> Condition: {product.condition}</p>
                  <p className="mt-2 text-md  text-gray-600"> Location: {product.location}</p>
                  <p className="mt-2 text-md  text-gray-600"> Recent Owners: {product.owners}</p>
                  <p className="mt-2 text-md  text-gray-600"> Phone No: {product.contact}</p>
                  <p className="mt-2 text-lg font-semibold text-blue-900"> Price: रु {product.price}</p>
                 
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">No products found.</p>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default ProductList;
