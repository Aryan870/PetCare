import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AddPrescription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appointment, setAppointment] = useState(null);
  const [prescriptionText, setPrescriptionText] = useState("");

  useEffect(() => {
    if (location.state && location.state.appointment) {
      setAppointment(location.state.appointment);
    } else {
      alert("Invalid access! Redirecting...");
      navigate("/doctorappointments");
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!prescriptionText.trim()) {
      alert("Please enter a prescription before submitting.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/prescriptions/", {
        appointmentId: appointment?.id,
        doctorId: appointment?.doctorId,
        patientId: appointment?.patientId,
        prescriptionText,
      });
  
      alert("Prescription added successfully!");
      navigate("/doctorappointments");
    } catch (error) {
      console.error("Error saving prescription:", error);
      alert("Failed to save prescription. Please try again.");
    }
  };
  

  if (!appointment) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Prescription</h2>

      <p className="mb-4">
        <strong>Patient:</strong> {appointment.patientName}
      </p>

      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700 font-semibold mb-2">
          Prescription:
        </label>
        <textarea
          className="w-full p-2 border rounded-md"
          rows="5"
          placeholder="Write prescription details here..."
          value={prescriptionText}
          onChange={(e) => setPrescriptionText(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Save Prescription
        </button>
      </form>
    </div>
  );
};

export default AddPrescription;
