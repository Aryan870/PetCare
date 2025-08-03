import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "doctor",
    fee: "",
    speciality: "",
    experience: "",
    timings: "",
    availability: [{ day: "", startTime: "", endTime: "" }],
    about: "",
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

  const handleAvailabilityChange = (index, e) => {
    const { name, value } = e.target;
    const newAvailability = [...formData.availability];
    newAvailability[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      availability: newAvailability,
    }));
  };

  const addAvailability = () => {
    setFormData((prevData) => ({
      ...prevData,
      availability: [
        ...prevData.availability,
        { day: "", startTime: "", endTime: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { confirmPassword, availability, ...rest } = formData;
      const timings = availability
        .map((item) => `${item.day}: ${item.startTime}-${item.endTime}`)
        .join("; ");
      const dataToSend = { ...rest, timings };
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        dataToSend
      );
      alert("Registration successful! Please log in.");
      navigate("/doctorLogin");
    } catch (error) {
      console.error("Error registering the doctor:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:justify-between p-10 space-y-10 lg:space-y-0">
      {/* Image Section */}
      <div className="md:w-1/2 rounded-2xl overflow-hidden flex justify-center">
        <img
          src="src/images/group-of-doctors.png"
          alt="Group of Doctors"
          className="w-full max-w-xl h-auto object-cover rounded-xl shadow-md border border-gray-200"
        />
      </div>

      {/* Form Section */}
      <div className="lg:w-1/2 bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-5 text-gray-700">
          Doctor Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password:</label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Confirm Password:
            </label>
            <div className="flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 text-sm text-blue-600"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <label className="block text-gray-700 mb-2">Fees:</label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Specialization:</label>
            <input
              type="text"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Experience (Years):
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <h3 className="text-xl font-bold text-gray-700 mt-5">Availability</h3>
          {formData.availability.map((availability, index) => (
            <div key={index} className="space-y-3 mt-3">
              <div>
                <label className="block text-gray-700">Day:</label>
                <select
                  name="day"
                  value={availability.day}
                  onChange={(e) => handleAvailabilityChange(index, e)}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">Select a day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <div className="w-1/2">
                  <label className="block text-gray-700">Start Time:</label>
                  <input
                    type="time"
                    name="startTime"
                    value={availability.startTime}
                    onChange={(e) => handleAvailabilityChange(index, e)}
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700">End Time:</label>
                  <input
                    type="time"
                    name="endTime"
                    value={availability.endTime}
                    onChange={(e) => handleAvailabilityChange(index, e)}
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addAvailability}
            className="mt-3 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Add Availability
          </button>

          <div>
            <label className="block text-gray-700 mb-2">About:</label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="mt-5 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignup;
