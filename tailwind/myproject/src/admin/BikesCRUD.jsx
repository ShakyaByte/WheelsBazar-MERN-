import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [formData, setFormData] = useState({
    Bikeid: "",
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const id = "HONDA"; /*aba bajaj ko garne*/
      const response = await axios.get(`http://localhost:5500/admin/all/${id}`);
      setBikes(response.data);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Current editMode:", editMode); // Debug editMode
    console.log("Current editId:", editId); // Debug editId
    console.log("Submitting form data:", formData); // Debug form data

    try {
      if (editMode) {
        console.log(`Sending PUT request to /admin/update/${editId}`);
        const response = await axios.put(`http://localhost:5500/admin/update/${editId}`,formData );
        console.log("Update response:", response.data);
        setEditMode(false);
        setEditId(null);
      } else {
        console.log("Sending POST request to /admin/add");
        await axios.post("http://localhost:5500/admin/add", formData);
      }
      setFormData({
        Bikeid: "",
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
      fetchBikes();
    } catch (error) {
      console.error("Failed to submit bike:", error.response?.data || error.message);
    }
  };

  const handleEdit = (bike) => {
    console.log("Editing bike with _id:", bike._id);
    setFormData({
      Bikeid: bike.Bikeid,
      name: bike.name,
      price: bike.price,
      image: bike.image,
      description: bike.description,
      category: bike.category,
    });
    setEditMode(true);
    setEditId(bike._id);
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting bike with ID:", id);
      await axios.delete(`http://localhost:5500/admin/delete/${id}`);
      fetchBikes();
    } catch (error) {
      console.error("Failed to delete bike:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      <div className="flex justify-center">
        <div className="w-[90%] max-w-4xl">
          <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="Bikeid"
                placeholder="Bike ID (e.g., KTM)"
                value={formData.Bikeid}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Bike Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price ($)"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-30"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-13"
                required
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition duration-300 cursor-pointer"
              >
                {editMode ? "Update Bike" : "Add Bike"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="overflow-y-auto bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <div
              key={bike._id}
              className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={bike.image}
                alt={bike.name}
                className="w-full h-48 object-contain rounded-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-4">{bike.name}</h3>
              <p className="text-gray-600 mt-2">{bike.description}</p>
              <p className="text-blue-600 font-bold mt-2">${bike.price}</p>
              <p className="text-sm text-gray-500 mt-1">{bike.category}</p>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleEdit(bike)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(bike._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBikes;