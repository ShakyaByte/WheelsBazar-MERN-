import { useState } from "react";
import { FaTachometerAlt, FaUsers, FaMotorcycle, FaCog, FaSignOutAlt } from "react-icons/fa";
import Bikes from "./BikesCRUD"; // Import the Bikes component
import NewCategories from "./AllProductsCRUD"

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">BikeWale Admin</h1>
        <div className="flex space-x-6">
          {[
            { name: "Dashboard", icon: FaTachometerAlt },
            { name: "Products", icon: FaUsers },
            { name: "Bikes", icon: FaMotorcycle },
            { name: "Settings", icon: FaCog },
          ].map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-700 ${
                activeTab === tab.name ? "bg-blue-700" : ""
              }`}
            >
              <tab.icon />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
        <button className="flex items-center px-4 py-2 rounded-lg transition duration-300 hover:bg-red-600">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-hidden h-[750px]">
        <header className="bg-white shadow-md p-4 flex justify-between items-center rounded-lg mb-6">
          <h2 className="text-2xl font-semibold">{activeTab}</h2>
          <span className="text-gray-600">Admin Panel</span>
        </header>

        <section className="h-full">
          {activeTab === "Dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Total Users", "Total Bikes", "Pending Requests"].map((title, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h3 className="text-lg font-medium text-gray-700">{title}</h3>
                  <p className="text-3xl font-bold text-blue-900 mt-2">{Math.floor(Math.random() * 100)}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Bikes" && <Bikes />}
          {activeTab === "Products" && <NewCategories />}
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;
