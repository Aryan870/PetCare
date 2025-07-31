import React, { useState } from "react";
import PaymentComponent from "./PaymentComponent";

const AppointmentPage = () => {
  const [appointmentAmount, setAppointmentAmount] = useState(500);

  return (
    <div>
      <h2>Book an Appointment</h2>
      <PaymentComponent amount={appointmentAmount} onSuccess={() => alert("Appointment Confirmed!")} />
    </div>
  );
};

export default AppointmentPage;
