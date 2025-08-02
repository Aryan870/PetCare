import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    address: "",
    phone: "",
    age: "",
    breed: "",
    medicalHistory: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { confirmPassword, ...dataToSend } = formData;
      await axios.post("http://localhost:5000/api/auth/register", dataToSend);
      alert("Registration successful! Please log in.");
      navigate("/patientLogin");
    } catch (error) {
      console.error("There was an error registering the patient!", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row items-center bg-white rounded-3xl shadow-xl max-w-6xl w-full p-10 space-y-10 lg:space-y-0 lg:space-x-10">
        {/* Image Section */}
        <div className="lg:w-1/2 rounded-2xl overflow-hidden shadow-lg max-w-md w-full">
          <img
            src="src/images/registerpage.png"
            alt="Group of Patients"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-4xl font-extrabold mb-8 text-green-700 text-center">
            Patient Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Full Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Password:
              </label>
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-sm text-green-600 hover:text-green-800 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Confirm Password:
              </label>
              <div className="flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="ml-2 text-sm text-green-600 hover:text-green-800 transition"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Role:
              </label>
              <input
                type="text"
                name="role"
                value="PATIENT"
                disabled
                className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Phone:
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Breed:
              </label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
             <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Age:
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
             <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Medical History:
              </label>
              <input
                type="text"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition mt-6 font-semibold"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientSignUp;
