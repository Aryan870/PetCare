import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", adminData, { withCredentials: true });
      
      localStorage.setItem("admin", JSON.stringify(response.data));
      alert("Admin Login Successful!");
      navigate("/admin/dashboard"); // Redirect after successful login
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin}>
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

          <button 
            type="submit" 
            className="w-full p-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/admin-register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
