import React, {useRef} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from '../pages/Homepage';
import BikesPage from '../pages/Bikepage'; 
import AdminPage from '../src/admin/AdminPage';

/*import Bikes from './admin/Bikes';*/
import YamahaBikes from '../BrandCategories/YamahaBikes';
import KTMBikes from '../BrandCategories/KTMbikes';
import BajajBikes from '../BrandCategories/BajajBikes';
import HondaBikes from '../BrandCategories/HondaBikes';

/*Register and LoginPage with context api for generating tokens*/
import RegisterPage from './authentication/register';
import LoginPage from './authentication/login';
import ProductForm from '../pages/UserDashboard';
import { AuthProvider } from './components/AuthContext';
import UserProfile from '../pages/UserProfile';

/*new categories*/
import Helmets from '../DifferntCategories/Helmets';
import RidingGears from '../DifferntCategories/RidingGears';
import Accessories from '../DifferntCategories/Accesories';
import Mods from '../DifferntCategories/mods';

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
 
  /* Refrence for bike categories*/ 
  const featuredRef = useRef(null);
  const UsedBikesRef = useRef(null);

  /*moves to the provided content*/
  const scrollToFeatured = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToUsedBikes = () => {
    if (UsedBikesRef.current) {
      UsedBikesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      {/*Navbar will not be displayed on adminpage*/}
      {!isAdminPage && <Navbar  scrollToFeatured={scrollToFeatured} scrollToUsedBikes={scrollToUsedBikes}/>}
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage featuredRef={featuredRef} UsedBikesRef={UsedBikesRef}/>}/>
          <Route path="/brands" element={<BikesPage />} />
            <Route path="/admin" element={<AdminPage />} />

            {/*brands path*/}
            <Route path="/yamaha" element={<YamahaBikes />} />
            <Route path="/ktm" element={<KTMBikes/>} />
            <Route path="/bajaj" element={<BajajBikes/>} />
            <Route path="/honda" element={<HondaBikes/>} />
            {/*brands path till here*/}

             {/*diiferent categories path*/}
             <Route path="/helmets" element={<Helmets />} />
             <Route path="/ridinggears" element={<RidingGears />} />
             <Route path="/accessories" element={<Accessories />} />
              <Route path="/mods" element={<Mods />} />
            {/*diiferent categories till here*/}


            {/*for authentication*/}
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            {/* Till here */}

            <Route path="/post" element={<ProductForm/>} />
            <Route path="/userprofile" element={<UserProfile/>} />
            {/*<Route path="/dashboard" element={<Dashboard/>} />*/}
            

        </Routes>
      </main>

      {!isAdminPage && <Footer scrollToFeatured={scrollToFeatured} scrollToUsedBikes={scrollToUsedBikes} />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider> {/* AuthProvider wraps Router */}
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;