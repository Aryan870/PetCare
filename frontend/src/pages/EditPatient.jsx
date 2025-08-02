import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPatient = () => {
  console.log("EditPatient component mounted");
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    medicalHistory: "",
    address: "",
    phone: "",
    breed: "",
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const patientToUpdate = { ...patient };
      if (patientToUpdate.password === "") {
        delete patientToUpdate.password;
      }
      await axios.put(`http://localhost:5000/api/auth/${id}`, patientToUpdate);
      alert("Patient updated successfully!");
      navigate("/admin/patients");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Edit Patient</h2>

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block font-medium">Name:</label>
            <input type="text" name="name" value={patient.name} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Email:</label>
            <input type="email" name="email" value={patient.email} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Password:</label>
            <input type="text" name="password"  placeholder="New Password" onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Age:</label>
            <input type="number" name="age" value={patient.age} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Medical History:</label>
            <input type="text" name="medicalHistory" value={patient.medicalHistory} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Address:</label>
            <input type="text" name="address" value={patient.address} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Phone:</label>
            <input type="text" name="phone" value={patient.phone} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Breed:</label>
            <input type="text" name="breed" value={patient.breed} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
            Update Patient
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;
