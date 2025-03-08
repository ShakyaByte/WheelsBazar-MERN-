import React from 'react';
import Hero from '../src/components/Herosection';
import BikeCategories from '../src/components/BikeCategories';
import FeaturedBikes from '../src/components/FeaturedBikes';

const HomePage = () => {
  return (
    <>
      <Hero />
      <BikeCategories />
      <FeaturedBikes />
    </>
  );
};

export default HomePage;