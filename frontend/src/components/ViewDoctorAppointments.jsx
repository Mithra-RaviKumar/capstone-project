import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/userCommon.css';
import { useNavigate } from "react-router-dom";
const ViewDoctorAppointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorID, setSelectedDoctorID] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

 
  useEffect(() => {
    axios
      .get("https://backend-ze0w.onrender.com/api/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors", err));
  }, []);

useEffect(() => {
  if (!selectedDoctorID) {
    setAppointments([]);
    setMessage("");
    return;
  }

  axios
    .get(`https://backend-ze0w.onrender.com/api/patients/appointments/doctors/${selectedDoctorID}`)
    .then((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        setAppointments(res.data);
        setMessage("");
      } else {
        setAppointments([]);
        setMessage("No appointments found for this doctor.");
      }
    })
    .catch((err) => {
      console.error(err);
      
      setAppointments([]);
      setMessage("No appointments found for this doctor.");
    });
}, [selectedDoctorID]);
const navigate = useNavigate();
  return (
    <div className="user-page">
      <div className="user-container">
      <h2>View Doctor Appointments</h2>

      <div className="form-group">
        <label>Select Doctor: </label>
        <select style={{ color: 'black' }}
          value={selectedDoctorID}
          onChange={(e) => setSelectedDoctorID(e.target.value)}
        >
          <option value="">-- Select Doctor --</option>
          {doctors.map((doc) => (
            <option key={doc.doctorID} value={doc.doctorID}>
              {doc.name} ({doc.doctorID})
            </option>
          ))}
        </select>
      </div>

      {message && <p>{message}</p>}

      {appointments.length > 0 && (
        
  <table className="table-dark">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient ID</th>
              <th>Date</th>
              <th>Time</th>
              
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app._id}>
                <td>{app.appointmentID}</td>
                <td>{app.patientID}</td>
                <td>{app.date}</td>
                <td>{app.time}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        
      )
      }
      <button
      className="btn-danger logout-btn"
      onClick={() => navigate("/user-dashboard")}>
      Logout
    </button>
    </div>
    </div>
  );
};

export default ViewDoctorAppointments;
