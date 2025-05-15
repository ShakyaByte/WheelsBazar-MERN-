import React from 'react';
import { Link } from 'react-router-dom';
import helmets from '../assets/diiferent-categories/helmets.jpg';
import RidingGears from '../assets/diiferent-categories/jacket.jpg';
import accessories from '../assets/diiferent-categories/accesories.jpeg';
import mods from '../assets/diiferent-categories/mods.jpg';

const Helmets = () => (
  <Link to='/helmets'>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={helmets} alt="Yamaha Bikes" className="w-full h-48 object-contain md:object-contain" />
      <div className="p-4 md:pt-0">
        <h3 className="text-xl font-semibold text-center  md:text-[17px]"> Helmets </h3>
      </div>
    </div>
  </Link>
);

const Ridinggears = () => (
  <Link to='/ridinggears'>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={RidingGears} alt="Cruiser Bikes" className="w-full h-48 object-contain  md:object-contain" />
      <div className="p-4 md:pt-0">
        <h3 className="text-xl font-semibold text-center  md:text-[17px] "> Riding Gears </h3>
      </div>
    </div>
  </Link>
);

const Accessories = () => (
  <Link to='/accessories'>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={accessories} alt="KTM Bikes" className="w-full h-48 object-contain  md:object-contain" />
      <div className="p-4 md:pt-0">
        <h3 className="text-xl font-semibold text-center  md:text-[17px]"> Bike Accessories  </h3>
      </div>
    </div>
  </Link>
);

const Mods = () => (
  <Link to='/mods'>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={mods} alt="Scooters" className="w-full h-48 object-contain  md:object-contain" />
      <div className="p-4 md:pt-0">
        <h3 className="text-xl font-semibold text-center md:text-[17px]">Bike Mods</h3>
      </div>
    </div>
  </Link>
);

const Differentcategory = () => {
  return (
    <div className="max-w-7xl mx-11 px-4 sm:px-6 lg:px-8 py-12 lg:max-w-full">
      <h2 className="text-3xl font-bold text-center mb-8"> Complete Motorcycle Gear Hub</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:w-full">
        <Helmets />
        <Ridinggears/>
        <Accessories />
        <Mods />
      </div>
    </div>
  );
};

export default Differentcategory;