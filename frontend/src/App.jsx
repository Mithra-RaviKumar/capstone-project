import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AddDoctor from "./components/AddDoctor";
import ViewDoctor from "./components/ViewDoctor";
import EditDoctor from "./components/EditDoctor";
import DeleteDoctor from "./components/DeleteDoctor";
import SuggestDoctor from "./components/SuggestDoctor";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import AddPatient from "./components/AddPatient";
import AddAilment from "./components/AddAilment";
import ModifyAilment from "./components/ModifyAilment";
import ViewDoctorAppointments from "./components/ViewDoctorAppointments";
import RequestAppoinment from "./components/RequestAppoinment";
import ViewPatientAppointments from "./components/ViewPatientAppointments";
import ReporterDashboard from "./components/ReporterDashboard";
import Reporter from "./components/Reporter";

import About from "./components/About";
import Contact from "./components/Contact";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/view-doctor" element={<ViewDoctor />} />
        <Route path="/edit-doctor" element={<EditDoctor />} />
        <Route path="/delete-doctor" element={<DeleteDoctor />} />
        <Route path="/suggest-doctor" element={<SuggestDoctor />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/add-patient" element={<AddPatient/>} />
        <Route path="/add-ailment" element={<AddAilment />} />
        <Route path="/modify-ailment" element={<ModifyAilment />} />
        <Route path="/viewdocapp" element={<ViewDoctorAppointments doctorID={2}/>} />
        <Route path="/reqapp" element={<RequestAppoinment />} />
        <Route path="/allapp" element={<ViewPatientAppointments />} />
         <Route path="/reporter-dashboard" element={<ReporterDashboard />} /> 
         <Route path="/reporter" element={<Reporter />} />
         <Route path="/about" element={<About />} /> 
         <Route path="/contact" element={<Contact />} />  
        
      </Routes>
    </Router>
  );
}

export default App;
