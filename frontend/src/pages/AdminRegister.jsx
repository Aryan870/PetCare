import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
    adminCode: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await axios.post("http://localhost:5000/api/admin/register", {
        ...adminData,
        role: "ADMIN",
      });

      setSuccessMessage("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/admin/login"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      setError(error.response?.data || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Registration</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block font-medium">Full Name:</label>
            <input 
              type="text" 
              name="name" 
              value={adminData.name} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-md"
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Email:</label>
            <input 
              type="email" 
              name="email" 
              value={adminData.email} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-md"
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={adminData.password} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-md"
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Admin Code:</label>
            <input 
              type="text" 
              name="adminCode" 
              value={adminData.adminCode} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-md"
              required 
            />
          </div>

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/admin-login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
