import React from 'react';

const Hero = () => {
  return (
    <div
      className="bg-[url('https://cdn.leonardo.ai/users/0eb6c3b1-3b1a-4bb0-a1fe-13b274daa174/generations/fafaaaf4-4ff3-4ddb-a6ee-8c6dae0f8929/segments/2:4:1/Flux_Dev_Create_a_blackandwhite_silhouette_of_a_motorcyclist_r_1.jpeg')] bg-cover h-[700px] text-white py-20 w-ful mt-[65px]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold mb-4 text-black">Find Your Dream Bike</h1>
        <p className="text-xl mb-8 text-black">
          Explore the best bikes from top brands. Compare prices, specs, and more.
        </p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search for bikes..."
            className="w-96 px-4 py-2 rounded-l-lg focus:outline-none text-black bg-white"
          />
          <button className="bg-blue-700 px-6 py-2 rounded-r-lg hover:bg-blue-800">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;