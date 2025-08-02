import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    fee: "",
    timings: "",
    experience: "",
    about: "",
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const doctorToUpdate = { ...doctor };
      if (doctorToUpdate.password === "") {
        delete doctorToUpdate.password;
      }
      await axios.put(`http://localhost:5000/api/auth/${id}`, doctorToUpdate);
      alert("Doctor updated successfully!");
      navigate("/admin/doctors");
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Failed to update doctor.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Edit Doctor</h2>

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block font-medium">Name:</label>
            <input type="text" name="name" value={doctor.name} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Email:</label>
            <input type="email" name="email" value={doctor.email} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Password:</label>
            <input type="text" name="password" placeholder="New Password" onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Specialization:</label>
            <input type="text" name="speciality" value={doctor.speciality} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Fees:</label>
            <input type="number" name="fee" value={doctor.fee} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Timings:</label>
            <input type="text" name="timings" value={doctor.timings} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Experience:</label>
            <input type="text" name="experience" value={doctor.experience} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <div className="mb-4">
            <label className="block font-medium">About:</label>
            <textarea name="about" value={doctor.about} onChange={handleChange} className="w-full p-2 border rounded-md"></textarea>
          </div>

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
            Update Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDoctor;
