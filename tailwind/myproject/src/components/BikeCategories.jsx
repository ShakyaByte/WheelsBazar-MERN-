import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/R1.png';
import bajaj from '../assets/bajaj.png';
import ADV from '../assets/ADV.png';
import HondaImg from '../assets/Honda.png';

const YamahaBikes = () => (
  <Link to='/yamaha'>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={heroImage} alt="Yamaha Bikes" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-center">Yamaha Bikes</h3>
      </div>
    </div>
  </Link>
);

const BajajBikes = () => (
  <Link to='/bajaj'>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={bajaj} alt="Cruiser Bikes" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-center">Bajaj Bikes</h3>
      </div>
    </div>
  </Link>
);

const KTMBikes = () => (
  <Link to='/ktm'>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={ADV} alt="KTM Bikes" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-center">KTM Bikes</h3>
      </div>
    </div>
  </Link>
);

const HondaBikes = () => (
  <Link to='/honda'>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={HondaImg} alt="Scooters" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-center">Honda Bikes</h3>
      </div>
    </div>
  </Link>
);

const BikeCategories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Explore Bike Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <YamahaBikes />
        <BajajBikes />
        <KTMBikes />
        <HondaBikes />
      </div>
    </div>
  );
};

export default BikeCategories;