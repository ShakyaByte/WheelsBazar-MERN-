import React, { useState } from "react";
import axios from "axios";
const UserDashboard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    condition: "",
    year: "",
    location: "",
    owners: "",
    contact: "",
  });

  //Handeling Error message for empty input fields
  const [error, setError] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    condition: "",
    year: "",
    location: "",
    owners: "",
    contact: "",
  });


  // Validation function
  const validateStep = () => {
    let newErrors = { title: "", description: "", price: "", images: "", year: "", condition: "", location: "", owners: "",
                    contact: "",};
    let isValid = true;


    if (step === 1 && !formData.images) {
      newErrors.images = "Image is required.";
      isValid = false;
    }


    if (step === 2) {
      if (!formData.title) {
        newErrors.title = "Title is required.";
        isValid = false;
      }
      if (!formData.description) {
        newErrors.description = "Description is required.";
        isValid = false;
      }

      if (!formData.year) {
        newErrors.year = "Manufacturing year is required.";
        isValid = false;
      }

      if (!formData.condition) {
        newErrors.condition = "Condition is required.";
        isValid = false;
      }

      
      if (!formData.location) {
        newErrors.location = "Location is required.";
        isValid = false;
      }

      
      if (!formData.owners) {
        newErrors.owners = "No of Owners is required.";
        isValid = false;
      }

      
      if (!formData.contact) {
        newErrors.contact = "Phone no is required.";
        isValid = false;
      }

    }


    if (step === 3) {
      if (!formData.price) {
        newErrors.price = "Price is required.";
        isValid = false;
      } else if (isNaN(formData.price) || formData.price <= 0) {
        newErrors.price = "Enter a valid price.";
        isValid = false;
      }
    }


    setError(newErrors);
    return isValid;
  };


  // Handle input change and reset error messages
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  // Next step function with validation
  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };
  const prevStep = () => setStep((prev) => prev - 1);

   // Submit function
  
const [postError, setPostError] = useState("");  {/*managing state for login requirements*/}
const handleSubmit = async (e) => {
    e.preventDefault();
  if (!validateStep()) return;

  const submissionData = {
    ...formData,
    images: [formData.images],
  };

  try {
    await axios.post(
      "http://localhost:5500/product/add",
      submissionData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    setFormData({
      title: "",
      description: "",
      price: "",
      images: "",
      year: "",
      condition: "",
      location: "",
      owners: "",
      contact: "",
    });
    setPostError(""); // Clear previous error
    setStep(4);
  } catch (error) {
    console.error("Error adding product:", error.response?.data || error.message);
    setPostError("Failed to post the ad. Please login to post the ad.");
  }
};

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-4 pt-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 1: Upload Image</h2>
            <input
              type="text"
              name="images"
              placeholder="Image URL"
              value={formData.images || ""}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              {error.images && <p className="text-red-500 text-sm">{error.images}</p>}


            <button
              onClick={nextStep}
              className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 cursor-pointer">
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 2: Add Details</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title || ""}
              onChange={handleChange}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              {error.title && <p className="text-red-500 text-sm mb-3">{error.title}</p>}


            <textarea
              name="description"
              placeholder="Description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
             {error.description && <p className="text-red-500 text-sm mb-3">{error.description}</p>}


             <input
              type="number"
              name="year"
              placeholder="Manufacturing Year"
              value={formData.year || ""}
              onChange={handleChange}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              {error.year && <p className="text-red-500 text-sm mb-3">{error.year}</p>}

              <select
                  name="condition"
                  value={formData.condition || ""}
                  onChange={handleChange}
                  className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select Condition</option>
                  <option value="New">New</option>
                  <option value="Likenew">Like New</option>
                  <option value="Used">Used</option>
              </select>
                {error.condition && <p className="text-red-500 text-sm mb-3">{error.condition}</p>}

                <input
              type="text"
              name="location"
              placeholder="Enter Your Location"
              value={formData.location || ""}
              onChange={handleChange}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              {error.location && <p className="text-red-500 text-sm mb-3">{error.location}</p>}

              <input
              type="number"
              name="owners"
              placeholder="No of Recent Owners"
              value={formData.owners || ""}
              onChange={handleChange}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              {error.owners && <p className="text-red-500 text-sm mb-3">{error.owners}</p>}

              <input
              type="number"
              name="contact"
              placeholder="Enter Your Phone No"
              value={formData.contact || ""}
              onChange={handleChange}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              {error.contact && <p className="text-red-500 text-sm mb-3">{error.contact}</p>}


            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-400 transition duration-200 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-200 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 3: Set Price</h2>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price || ""}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {error.price && <p className="text-red-500 text-sm">{error.price}</p>}


            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-400 transition duration-200 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-200 cursor-pointer"
              >
                Submit
              </button>
              
            </div>
          </div>
        );
      case 4:
        return (
          <div className="p-6 text-center">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Post Ad</h2>
              <div className="flex items-center justify-center mb-4">
                <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-500 text-xl">✔</span>
                </span>
              </div>
              <p className="text-lg font-medium text-gray-800 mb-2">Congratulations</p>
              <p className="text-gray-600 mb-4">Your Ad has been posted.</p>
              <button
                onClick={() => setStep(1)}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

/*main page down here */
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      
      <div 
      className="bg-white rounded-xl shadow-lg p-7 w-full max-w-2xl [box-shadow:0px_0px_9px_1.5px_rgba(0,0,0,0.6)] mt-19 mx-10">{/*boxcontent*/}
      <p className="text-red-500 text-lg mb-4 text-center">{postError}</p> {/*login requirement message*/}
        {/* Updated Stepper for Center Alignment */}
        <div className="flex justify-center gap-20 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-lg transition-all duration-300 ${
                  step >= s
                    ? "bg-gray-600 text-white"
                    : "bg-gray-300 text-gray-600"
                } mb-2 shadow-md`}
              >
                {s}
              </div>
              <p className="text-sm text-gray-600">
                {s === 1 ? "Image" : s === 2 ? "Details" : "Price"}
              </p>
            </div>
          ))}
        </div>
        {renderStep()}
      </div>
    </div>
  );
};


export default UserDashboard;
