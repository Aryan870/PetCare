import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import SignupSelection from './pages/SignupSelection'
import LogSelection from './pages/LogSelection'
import DoctorSignup from './pages/DoctorSignup'
import PatientSignUp from './pages/PatientSignUp'
import DoctorLogin from './pages/DoctorLogin'
import PatientLogin from './pages/PatientLogin'
import DoctorDashboard from './pages/DoctorDashboard'
import PatientDashboard from './pages/PatientDashboard'
import BookingPage from './pages/BookingPage'
import AppointmentPage from './pages/AppointmentPage'
import VideoCall from './pages/VideoCall'
import BookAppointment from './pages/BookAppointment'
import MyBillings from './pages/MyBillings'
import DoctorAppointments from './pages/DoctorAppointment'
import AddPrescription from './pages/AddPrescription'
import AdminLogin from './pages/AdminLogin'
import AdminRegister from './pages/AdminRegister'
import AdminDashboard from './pages/AdminDashboard'
import AdminAllDoctors from './pages/AdminAllDoctors'
import AdminAllPatients from './pages/AdminAllPatients'
import AdminAllAppointments from './pages/AdminAllAppointments'
import AdminAllPrescriptions from './pages/AdminAllPrescriptions'
import EditPatient from './pages/EditPatient'
import EditDoctor from './pages/EditDoctor'
import AdminAllBillings from './pages/AdminAllBillings'


const App = () => {
  
  return (
    <div className='mx-1 sm:mx-[2%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/signup' element={<SignupSelection />} />
        <Route path='/login' element={<LogSelection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/doctorSignup' element={<DoctorSignup/>} />
        <Route path='/patientSignup' element={<PatientSignUp/>} />
        <Route path='/doctorLogin' element={<DoctorLogin/>} />
        <Route path='/patientLogin' element={<PatientLogin/>} />
        <Route path='/doctordashboard' element={<DoctorDashboard/>} />
        <Route path='/patientdashboard' element={<PatientDashboard/>}/>
        <Route path='/booking' element={<BookingPage/>}/>
        <Route path='/paymentgateway' element={<AppointmentPage/>}/>
        <Route path='/videocall/:roomId' element={<VideoCall/>}/>
        <Route path='/bookappointment' element={<BookAppointment/>}/>
        <Route path='/mybillings' element={<MyBillings/>}/>
        <Route path='/myappointments' element={<MyAppointments/>}/>
        <Route path='/doctorappointments' element={<DoctorAppointments/>}/>
        <Route path='/addprescription' element={<AddPrescription/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/register' element={<AdminRegister/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/doctors' element={<AdminAllDoctors/>}/>
        <Route path='/admin/patients' element={<AdminAllPatients/>}/>
        <Route path='/admin/appointments' element={<AdminAllAppointments/>}/>
        <Route path='/admin/prescriptions' element={<AdminAllPrescriptions/>}/>
        <Route path='/admin/editpatient/:id' element={<EditPatient/>}/>
        <Route path="/admin/edit-doctor/:id" element={<EditDoctor/>} />
        <Route path="/admin/billings" element={<AdminAllBillings />} />


      </Routes>
      <Footer />
    </div>
  )
}

export default App
