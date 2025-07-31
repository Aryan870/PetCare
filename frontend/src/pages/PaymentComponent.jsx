import React from "react";

const PaymentComponent = ({ amount, onSuccess }) => {
  const loadRazorpay = async () => {
    const response = await fetch("/api/payments/create?amount=" + amount, {
      method: "POST",
    });
    
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error fetching payment data:", errorMessage);
      return;
    }

    const orderData = await response.json().catch(err => {
      console.error("Error parsing JSON:", err);
    });

    const options = {
      key: "your_razorpay_key_id",
      amount: orderData.amount,
      currency: "INR",
      name: "Telemedicine Platform",
      description: "Consultation Payment",
      order_id: orderData.id,
      handler: function (response) {
        fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Payment Successful: " + data);
            onSuccess();
          })
          .catch((err) => console.log(err));
      },
      prefill: {
        name: "Patient Name",
        email: "patient@example.com",
        contact: "9876543210",
      },
      theme: { color: "#528FF0" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button onClick={loadRazorpay} className="btn btn-primary">
      Pay ₹{amount}
    </button>
  );
};

export default PaymentComponent;
