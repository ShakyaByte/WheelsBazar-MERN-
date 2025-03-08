import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
/*import BikeCategories from './components/BikeCategories';
import FeaturedBikes from './components/FeaturedBikes';*/
import Footer from './components/Footer';
import HomePage from '../pages/Homepage';
import BikesPage from '../pages/Bikepage'; 
import ComparePage from '../pages/ComparePage';
import AdminPage from '../src/admin/AdminPage';
/*import Bikes from './admin/Bikes';*/
import YamahaBikes from '../BrandCategories/YamahaBikes';
import KTMBikes from '../BrandCategories/KTMbikes';
import BajajBikes from '../BrandCategories/BajajBikes';
import HondaBikes from '../BrandCategories/HondaBikes';


function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      {!isAdminPage && <Navbar />}
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/brands" element={<BikesPage />} />
          <Route path="/compare" element={<ComparePage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/*brands path*/}
            <Route path="/yamaha" element={<YamahaBikes />} />
            <Route path="/ktm" element={<KTMBikes/>} />
            <Route path="/bajaj" element={<BajajBikes/>} />
            <Route path="/honda" element={<HondaBikes/>} />

        </Routes>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;