import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AddPrescription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appointment, setAppointment] = useState(null);
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', frequency: '' }]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (location.state && location.state.appointment) {
      setAppointment(location.state.appointment);
    } else {
      alert("Invalid access! Redirecting...");
      navigate("/doctorappointments");
    }
  }, [location, navigate]);

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '' }]);
  };

  const handleRemoveMedicine = (index) => {
    const newMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(newMedicines);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!notes.trim()) {
      alert("Please enter notes for the prescription.");
      return;
    }

    // Validate medicines
    for (const med of medicines) {
      if (!med.name.trim() || !med.dosage.trim() || !med.frequency.trim()) {
        alert("Please fill in all medicine fields.");
        return;
      }
    }
  
    try {
      await axios.post('http://localhost:5000/api/prescriptions', {
        appointmentId: appointment?._id,
        doctorId: appointment?.doctorId,
        patientId: appointment?.patientId._id,
        medicines,
        notes,
      });

      // Update appointment status to 'completed'
      await axios.put(`http://localhost:5000/api/appointments/${appointment._id}`, {
        status: 'completed',
      });
  
      alert("Prescription added and appointment completed successfully!");
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
        <strong>Patient:</strong> {appointment.patientId.name} 
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Medicines:
          </label>
          {medicines.map((med, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                className="w-1/3 p-2 border rounded-md"
                placeholder="Medicine Name"
                value={med.name}
                onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                className="w-1/3 p-2 border rounded-md"
                placeholder="Dosage (e.g., 1-0-1)"
                value={med.dosage}
                onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
              />
              <input
                type="text"
                className="w-1/3 p-2 border rounded-md"
                placeholder="Frequency (e.g., after food)"
                value={med.frequency}
                onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
              />
              {medicines.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMedicine(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMedicine}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add Medicine
          </button>
        </div>

        <label className="block text-gray-700 font-semibold mb-2">
          Notes:
        </label>
        <textarea
          className="w-full p-2 border rounded-md"
          rows="5"
          placeholder="Any additional notes or instructions..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
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
