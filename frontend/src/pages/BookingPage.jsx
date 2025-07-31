import { useLocation , useNavigate } from "react-router-dom";
import React from "react";



const BookingPage = () => {
  const { state: appointmentData } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="p-6 grid gap-8">
      <h1 className="text-2xl font-bold">Billing Information</h1>
      {appointmentData ? (
        <div className="p-4 shadow-lg border rounded-md">
            <p><strong>Appointment ID:</strong> {appointmentData.appointmentId}</p>
            <p><strong>Amount:</strong> {appointmentData.amount}</p>
            <p><strong>Payment Status:</strong> {appointmentData.paymentStatus}</p>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded-md" onClick={() => navigate('/paymentgateway')}>Proceed to Payment</button>
        </div>

      ) : (
        <p>No appointment data available.</p>
      )}
    </div>
  );
};

export default BookingPage;
