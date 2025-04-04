import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../src/components/AuthContext"; // Adjust the import path as needed
import axios from "axios";

const UserProfile = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  // State for ads, active tab, form data, and edit mode
  const [ads, setAds] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    condition: "",
    year: "",
    owners: "", 
    location: "",
    contact: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch user's ads from the backend using axios
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:5500/product/token/products", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const mappedAds = response.data.map((product) => ({
          id: product._id,
          title: product.title,
          description: product.description,
          price: `Rs. ${product.price}`,
          images: product.images[0] || "",
          condition: product.condition,
          year: product.year,
          owners: product.owners,
          location: product.location,
          contact: product.contact,
          status: product.status || "All",
        }));
        setAds(mappedAds);
      } catch (err) {
        setError(err.response?.data?.message || "Please Refresh the Page to Update the Product");
        console.error("Error fetching ads:", err);
      }
    };

    if (isLoggedIn) {
      fetchAds();
    }
  }, [isLoggedIn]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "owners" || name === "contact" ? Number(value) : value,
    });
  };

  // Handle form submission (update ad)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const payload = {
        ...formData,
        images: [formData.images], // Convert to array for backend compatibility
      };

      const response = await axios.put(
        `http://localhost:5500/product/update/${editId}`, // Updated endpoint
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedAd = response.data.updatedProduct; // Backend returns { message, updatedProduct }
      setAds(
        ads.map((ad) =>
          ad.id === editId
            ? { ...ad, ...updatedAd, price: `Rs. ${updatedAd.price}` }
            : ad
        )
      );
      setEditMode(false);
      setEditId(null);
      setFormData({
        title: "",
        description: "",
        price: "",
        images: "",
        condition: "",
        year: "",
        owners: "",
        location: "",
        contact: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Please Refresh the Page to Update the Product");
      console.error("Error updating ad:", err);
    }
  };

  // Handle edit action
  const handleEdit = (ad) => {
    setFormData({
      title: ad.title,
      description: ad.description,
      price: ad.price.replace("Rs. ", ""),
      images: ad.images,
      condition: ad.condition,
      year: ad.year,
      owners: ad.owners,
      location: ad.location,
      contact: ad.contact,
    });
    setEditMode(true);
    setEditId(ad.id);
  };

  // Handle delete product using axios
  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      await axios.delete(`http://localhost:5500/product/delete/${productId}`, { // Updated endpoint
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setAds(ads.filter((ad) => ad.id !== productId));
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
      console.error("Error deleting product:", err);
    }
  };

  // Filter ads based on active tab
  const filteredAds =
    activeTab === "All" ? ads : ads.filter((ad) => ad.status === activeTab);

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen bg-gray-100 mt-[65px]">
      {/* Left Sidebar - User Info */}
      <div className="w-1/4 p-6 bg-white shadow-md">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-gray-800">{user?.name || "N/A"}</h2>
            <p className="text-gray-600">{user?.email || "N/A"}</p>
            <p className="text-gray-500 text-sm">Member Since: 2018-10-06</p>
            <p className="text-gray-500 text-sm">📍 N/A</p>
          </div>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Edit Profile
        </button>
        <button
          onClick={handleLogout}
          className="w-full mt-2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Main Content - Posted Ads */}
      <div className="w-3/4 p-6">
        {/* Tabs */}
        <div className="flex border-b mb-6">
          {["All", "Hold", "Sold", "Expired"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center text-red-500 mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Edit Form (only shown in edit mode) */}
        {editMode && (
          <div className="flex justify-center">
            <div className="w-[90%] max-w-4xl">
              <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price (Rs.)"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="images"
                    placeholder="Image URL"
                    value={formData.images}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="condition"
                    placeholder="Condition (e.g., likenew)"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="year"
                    placeholder="Year (e.g., 2023)"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    name="owners"
                    placeholder="Number of Owners"
                    value={formData.owners}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    name="contact"
                    placeholder="Contact Number"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition duration-300 cursor-pointer"
                  >
                    Update Ad
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Ads List */}
        {filteredAds.length > 0 ? (
          <div className="overflow-y-auto bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAds.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={ad.images}
                    alt={ad.title}
                    className="w-full h-48 object-contain rounded-lg"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mt-4">{ad.title}</h3>
                  <p className="text-gray-600 mt-2">{ad.description}</p>
                  <p className="text-blue-600 font-bold mt-2">{ad.price}</p>
                  <p className="text-sm text-gray-500 mt-1">Condition: {ad.condition}</p>
                  <p className="text-sm text-gray-500 mt-1">Year: {ad.year}</p>
                  <p className="text-sm text-gray-500 mt-1">Owners: {ad.owners}</p>
                  <p className="text-sm text-gray-500 mt-1">Location: {ad.location}</p>
                  <p className="text-sm text-gray-500 mt-1">Contact: {ad.contact}</p>
                  <p className="text-sm text-gray-500 mt-1">Status: {ad.status}</p>
                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={() => handleEdit(ad)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ad.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>There are no ads available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;