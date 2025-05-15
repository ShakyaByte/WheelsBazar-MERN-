import React from 'react';
import Hero from '../src/components/Herosection';
import BikeCategories from '../src/components/BikeCategories';
import FeaturedBikes from '../src/components/FeaturedBikes';
import ProductList from '../src/components/ProductList';
import Differentcategory from '../src/components/DifferentCategory';

const HomePage = ({ featuredRef, UsedBikesRef }) => {
  return (
    <>
      <Hero />
       {/* Attach the ref to FeaturedBikes */}
       <div ref={featuredRef}> 
      <BikeCategories />
      <Differentcategory />
      </div>
        <FeaturedBikes />
        <div ref={UsedBikesRef}>       
      <ProductList />
      </div>
    </>
  );
};


export default HomePage;