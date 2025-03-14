import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

   // In LoginPage.jsx, inside handleSubmit:
try {
  const response = await axios.post(
    "http://localhost:5500/user/login",
    formData,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );

  const token = response.data.token;
  const userData = {
    email: response.data.email || formData.email,
    name: response.data.name, /*getting useranme from backend res*/
  };

  // Call login from context to update state and localStorage
  login(token, userData);

  // Display userdata before storing
  console.log("Storing token:", token);
  console.log("Storing userData:", userData);

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userData));

  // Verify storage
  console.log("Stored user:", localStorage.getItem("user"));

  setSuccess("Login successful!");
  setTimeout(() => {
    navigate("/");
  }, 1000);
      
  } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
  } finally {
      setLoading(false);
  }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="mt-3 text-center text-gray-600">
          Don't have an account? {" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;