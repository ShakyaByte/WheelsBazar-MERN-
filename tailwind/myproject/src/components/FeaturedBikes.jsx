import React from 'react';
import Feature1 from '../assets/R15M.jpg'
import Feature2 from '../assets/MT.png'
import Feature3 from '../assets/duke.png'
import Feature4 from '../assets/NS200.png'
const FeaturedBikes = () => {
  const bikes = [
    { name: 'Yamaha R15M', price: 'रु6,39,000', image: Feature1, engine: '155cc Liquid Cooled Single Cylinder 4V SOHC', brand: 'Yamaha'},
    { name: 'Yamaha MT-15', engine: '155cc Liquid Cooled Single Cylinder 4V SOHC', price: 'रु 5,80,000', image: Feature2 , brand:'Yamaha'},
    { name: 'KTM Duke 200', price: 'रु 5,85,000', image: Feature3, engine: '199.5cc Liquid-Cooled Single-Cylinder DOHC', brand: 'KTM' },
    { name: 'Bajaj Pulsar NS200', price: 'रु 4,13,900', image: Feature4, engine: '199.5cc Liquid-Cooled Single-Cylinder Triple Spark', brand: 'Bajaj' },
  ];

  return (
    <div className="max-w-7xl mx-auto pt-2 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Trending Bikes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 cursor-pointer">
        {bikes.map((bike, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={bike.image} alt={bike.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{bike.name}</h3>
              <p className="text-gray-600"> Brand: {bike.brand}</p>
              <p className="text-gray-600"> Engine: {bike.engine}</p>
              <p className="text-gray-600"> Price: {bike.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBikes;