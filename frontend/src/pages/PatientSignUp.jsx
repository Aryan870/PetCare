import React, { useState, useEffect } from "react";
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
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.phone) {
        newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be 10 digits.";
    }
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.breed) newErrors.breed = "Breed is required.";
    if (!formData.age) {
        newErrors.age = "Age is required.";
    } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
        newErrors.age = "Age must be a positive number.";
    }
    if (!formData.medicalHistory) newErrors.medicalHistory = "Medical history is required.";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    if (!isFormValid) {
        return;
    }
    try {
      const { confirmPassword, ...dataToSend } = formData;
      await axios.post("http://localhost:5000/api/auth/register", dataToSend);
      alert("Registration successful! Please log in.");
      navigate("/patientLogin");
    } catch (error) {
      console.error("There was an error registering the patient!", error);
      setErrors({ submit: "Registration failed. Please try again." });
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
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-400' : 'focus:ring-green-400'} transition`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-400' : 'focus:ring-green-400'} transition`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                  className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-400' : 'focus:ring-green-400'} transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-sm text-green-600 hover:text-green-800 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
                  className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-400' : 'focus:ring-green-400'} transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="ml-2 text-sm text-green-600 hover:text-green-800 transition"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            {errors.submit && (
              <div className="text-red-500 text-sm text-center">{errors.submit}</div>
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
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-400' : 'focus:ring-green-400'} transition`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.address ? 'border-red-500 focus:ring-red-400' : 'focus:ring-green-400'} transition`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
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
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.breed ? 'border-red-500 focus:ring-red-400' : 'focus:ring-green-400'} transition`}
              />
              {errors.breed && <p className="text-red-500 text-xs mt-1">{errors.breed}</p>}
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
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.age ? 'border-red-500 focus:ring-red-400' : 'focus:ring-green-400'} transition`}
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
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
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.medicalHistory ? 'border-red-500 focus:ring-red-400' : 'focus:ring-green-400'} transition`}
              />
              {errors.medicalHistory && <p className="text-red-500 text-xs mt-1">{errors.medicalHistory}</p>}
            </div>
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition mt-6 font-semibold disabled:bg-gray-400"
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

