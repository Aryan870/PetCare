import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBillings = () => {
  const [billings, setBillings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "PATIENT") {
      alert("Unauthorized access.");
      return;
    }

    axios.get(`http://localhost:5000/api/billings/${user.id}`)
      .then(response => {
        setBillings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching billing records:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">Loading billing records...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Billing Records</h2>
      {billings.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Doctor Name</th>
              <th className="border p-2">Patient Name</th>
              <th className="border p-2">Appointment ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {billings.map((billing, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{billing.doctorName}</td>
                <td className="border p-2">{billing.patientName}</td>
                <td className="border p-2">{billing.appointmentId}</td>
                <td className="border p-2">₹{billing.amount}</td>
                <td className="border p-2">{billing.paymentStatus}</td>
                <td className="border p-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => window.open(`http://localhost:5000/api/billings/${billing.id}/download`, "_blank")}
                  >
                    Download Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No invoices found.</p>
      )}
    </div>
  );
};

export default MyBillings;
