import React, { useState } from "react";
import axios from "axios";
import '../styles/userCommon.css';
import { useNavigate } from "react-router-dom";
const RequestAppointment = () => {
  const [patientID, setPatientID] = useState("");
  const [doctorID, setDoctorID] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://backend-ze0w.onrender.com/api/patients/appointments/request", {
        patientID,
        doctorID,
        date,
        time
      });
      setMessage(res.data.message);
      setPatientID("");
      setDoctorID("");
      setDate("");
      setTime("");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error requesting appointment");
    }
  };
const navigate = useNavigate();
  return (
     <div className="user-page">
      <div className="user-container">
      <h2>Request New Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient ID: </label>
          <input
            type="text"
            value={patientID}
            onChange={(e) => setPatientID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Doctor ID: </label>
          <input
            type="text"
            value={doctorID}
            onChange={(e) => setDoctorID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Time: </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Request Appointment</button>
        
      </form>
      {message && <p>{message}</p>}
      <button
      className="btn-danger logout-btn"
      onClick={() => navigate("/user-dashboard")}>
      Logout
    </button>
    </div></div>
  );
};

export default RequestAppointment;
