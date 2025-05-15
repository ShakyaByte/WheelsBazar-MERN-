import React, { useState, useEffect } from "react";
import axios from "axios";

const Accessories  = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    fetchUserproducts();
  }, []);

  const fetchUserproducts = async () => {
    try {
      const id = "accessories";
      console.log("Fetching products for ID:", id);
      const response = await axios.get(`http://localhost:5500/admin/categories/all/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Fetched products:", response.data);
      setproducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error.response?.data || error.message);
    }
  };

  return (
    <div className="mb-7 mt-25" >
    <h2 className="text-2xl font-semibold mb-4 place-self-center lg:mb-8"> Accessories  </h2>
    <div 
    className="grid grid-cols-1 md:grid-cols-2 justify-center ml-10 mr-10 gap-6 
              xl:grid-cols-3 
              lg:ml-27 lg:mr-27 ">
                
    {products.map((product) => (
      <div key={product._id} className="bg-white p-3 rounded-lg shadow-md mb-8 transition-transform transform hover:[box-shadow:0px_0px_9px_1.5px_rgba(0,0,0,0.6)] hover:scale-105 sm:w-full w-full" >
      <img src={product.image} alt={product.name} 
        className="w-full h-68 object-contain,
        lg:objectfit-contain lg:h-80 rounded-lg 
        md:h-65 md:object-contain md:w-full
        sm:object-contain sm:h-95 
        xl:object-contain xl:h-70 " />
        
    <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
    <p className="text-md text-gray-500 mb-1"> Category: {product.category}</p>
    <p className="text-gray-600">{product.description}</p>
    <p className="text-blue-900 font-bold pt-1"> Price: रु{product.price}</p>
  </div>
))}
</div>

  </div>
  );
};

export default Accessories ;