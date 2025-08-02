import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { format } from 'date-fns'

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { currencySymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctors/${docId}`);
        setDocInfo(response.data);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
        alert("Failed to fetch doctor information.");
        navigate("/");
      }
    };

    if (docId) {
      fetchDoctorInfo();
    }
  }, [docId, navigate]);

  useEffect(() => {
    if (!docInfo) return;

    // Parse timings string into availability array
    let parsedAvailability = [];
    if (docInfo.timings) {
      parsedAvailability = docInfo.timings.split('; ').map(slot => {
        const [day, timeRange] = slot.split(': ');
        const [startTime, endTime] = timeRange.split('-');
        return { day, startTime, endTime };
      });
    }

    // Show only future available dates (next 2 months)
    const today = new Date();
    const futureDates = [];

    for (let i = 0; i <= 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = format(date, "EEEE"); // Get "Monday", "Tuesday", etc.

      if (parsedAvailability.some((slot) => slot.day === dayName)) {
        futureDates.push({ date, formatted: format(date, "yyyy-MM-dd") });
      }
    }
    setAvailableDates(futureDates);
  }, [docInfo]);

  useEffect(() => {
    if (!selectedDate || !docInfo) return;

    // Parse timings string into availability array
    let parsedAvailability = [];
    if (docInfo.timings) {
      parsedAvailability = docInfo.timings.split('; ').map(slot => {
        const [day, timeRange] = slot.split(': ');
        const [startTime, endTime] = timeRange.split('-');
        return { day, startTime, endTime };
      });
    }

    // Fetch available time slots for the selected date
    const dayName = format(new Date(selectedDate), "EEEE");
    const availability = parsedAvailability.find((slot) => slot.day === dayName);

    if (availability) {
      const startTime = parseInt(availability.startTime.split(":")[0], 10);
      const endTime = parseInt(availability.endTime.split(":")[0], 10);
      const slots = [];

      for (let hour = startTime; hour < endTime; hour++) {
        slots.push(`${hour}:00 - ${hour + 1}:00`);
      }

      setAvailableTimeSlots(slots);
    } else {
      setAvailableTimeSlots([]); // No availability for the selected day
    }
  }, [selectedDate, docInfo]);

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("❌ Please select a valid date and time.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      console.log("📡 Initiating payment for doctor:", docInfo.name);
  
      // ✅ Step 1: Create Payment Order
      const paymentResponse = await axios.post("http://localhost:5000/api/payments/create", {
        amount: docInfo.fee * 100,  // Convert to paise for Razorpay
      });
  
      console.log("Payment Response from Backend:", paymentResponse.data);
      if (!paymentResponse.data || !paymentResponse.data.id) {
        alert("❌ Payment initiation failed. Please try again.");
        return;
      }
  
      console.log("✅ Payment order created:", paymentResponse.data);
  
      // ✅ Step 2: Open Razorpay Payment Window
      const options = {
        key: "rzp_test_UCnm9ZETwzn9YW",
        amount: paymentResponse.data.amount,
        currency: "INR",
        name: "Telemedicine Platform",
        description: `Consultation with Dr. ${docInfo.name}`,
        order_id: paymentResponse.data.id,  // ✅ Correct key
        handler: async (response) => {
          try {
            console.log("Payment successful:", response);
            console.log("Razorpay callback response object:", response);
      
            // ✅ Verify payment with the backend
            const verifyResponse = await axios.post("http://localhost:5000/api/payments/verify", {
              orderId: response.razorpay_order_id,          // ✅ Correct key
              paymentId: response.razorpay_payment_id,      // ✅ Correct key
              razorpaySignature: response.razorpay_signature, // ✅ Correct key
            });
      
            console.log("Verification Response:", verifyResponse.data);
      
            if (verifyResponse.status !== 200) {
              alert("Payment verification failed!");
              return;
            }
      
            // ✅ If payment is verified, book the appointment
            const bookingResponse = await axios.post("http://localhost:5000/api/appointments/book", {
              patientId: JSON.parse(localStorage.getItem("user"))._id,
              doctorId: docInfo._id,
              date: selectedDate,
              time: selectedTime,
              isPaid: true,
            });
      
            alert("Appointment booked successfully!");
            navigate("/patientdashboard");
      
          } catch (error) {
            console.error("Booking failed:", error);
            alert("Booking failed, please try again.");
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem("user")).name,
          email: JSON.parse(localStorage.getItem("user")).email,
        },
        theme: { color: "#528FF0" },
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error("❌ Booking failed:", error.response?.data || error.message);
      alert("❌ Booking failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBypassPayment = async () => {
    if (!selectedDate || !selectedTime) {
      alert("❌ Please select a valid date and time.");
      return;
    }

    setIsLoading(true);

    try {
      // Bypass payment and directly book the appointment
      const bookingResponse = await axios.post("http://localhost:5000/api/appointments/book", {
        patientId: JSON.parse(localStorage.getItem("user"))._id,
        doctorId: docInfo._id,
        date: selectedDate,
        time: selectedTime,
        isPaid: false, // Mark as not paid
      });

      alert("Appointment booked successfully (Payment Bypassed)!");
      navigate("/patientdashboard");

    } catch (error) {
      console.error("❌ Booking failed:", error.response?.data || error.message);
      alert("❌ Booking failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
    return docInfo ? (
        <div>
            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>

                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                        {docInfo.name}
                        <img className='w-5' src={assets.verified_icon} alt="" />
                    </p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                            About <img className='w-3' src={assets.info_icon} alt="" />
                        </p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>

                    <p className='text-gray-500 font-medium mt-4'>
                        Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fee}</span>
                    </p>
                </div>
            </div>

            {/* Booking slots */}
            <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

      <label className="block mb-2 font-medium">Select Date:</label>
      <select className="w-full p-2 border rounded-md" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
        <option value="">-- Choose a Date --</option>
        {availableDates.map(({ formatted }) => (
          <option key={formatted} value={formatted}>{formatted}</option>
        ))}
      </select>

      <label className="block mt-4 mb-2 font-medium">Select Time Slot:</label>
      <select className="w-full p-2 border rounded-md" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} disabled={!selectedDate}>
        <option value="">-- Choose a Time --</option>
        {availableTimeSlots.map((slot, index) => (
          <option key={index} value={slot}>{slot}</option>
        ))}
      </select>

      <button onClick={handleConfirmBooking} disabled={!selectedDate || !selectedTime || isLoading} className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md">
        {isLoading ? "Processing..." : `Confirm & Pay ${currencySymbol}${docInfo.fee}`}
      </button>

      <button onClick={handleBypassPayment} disabled={!selectedDate || !selectedTime || isLoading} className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md">
        Bypass Payment & Book
      </button>
    </div>

            {/* Listing Related Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null
}

export default Appointment
