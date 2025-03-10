import React, { useState, useEffect } from "react";
import axios from "axios";

const BajajBikes = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    fetchUserBikes();
  }, []);

  const fetchUserBikes = async () => {
    try {
      const id = "BAJAJ";
      console.log("Fetching bikes for ID:", id);
      const response = await axios.get(`http://localhost:5500/admin/all/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Fetched Bikes:", response.data);
      setBikes(response.data);
    } catch (error) {
      console.error("Failed to fetch bikes:", error.response?.data || error.message);
    }
  };

  return (
    <div className="mt-25 mb-7" >
    <h2 className="text-2xl font-semibold mb-1 place-self-center lg:mb-8"> BAJAJ Bikes</h2>
    <div 
    className="grid grid-cols-1 md:grid-cols-2 justify-center ml-10 mr-10 gap-6 
              xl:grid-cols-3 
              lg:ml-27 lg:mr-27">
                
    {bikes.map((bike) => (
  <div key={bike._id} className="bg-white p-3 rounded-lg shadow-md mb-8 transition-transform transform hover:[box-shadow:0px_0px_9px_1.5px_rgba(0,0,0,0.6)] hover:scale-105 sm:w-full w-full" >
    <img src={bike.image} alt={bike.name} 
    className="w-full h-68 object-contain,
    lg:objectfit-contain lg:h-80 rounded-lg 
    md:h-65 md:object-contain md:w-full
    sm:object-contain sm:h-95 
    xl:object-contain xl:h-70 " />
    <h3 className="text-xl font-semibold mt-4">{bike.name}</h3>
    <p className="text-md text-gray-500 mb-1"> Category: {bike.category}</p>
    <p className="text-gray-600">{bike.description}</p>
    <p className="text-blue-900 font-bold pt-1"> Price: रु{bike.price}</p>
  </div>
))}
</div>

  </div>
  );
};

export default BajajBikes;