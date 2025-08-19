import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/userCommon.css';
import { useNavigate } from "react-router-dom";
const ViewPatientAppointments = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientID, setSelectedPatientID] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Error fetching patients", err));
  }, []);

  
  useEffect(() => {
    if (!selectedPatientID) {
      setAppointments([]);
      return;
    }

    axios
      .get(`http://localhost:5000/api/patients/appointments/patients/${selectedPatientID}`)
      .then((res) => {
        setAppointments(res.data);
        if (res.data.length === 0) setMessage("No appointments found for this patient.");
        else setMessage("");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error fetching appointments");
      });
  }, [selectedPatientID]);
const navigate = useNavigate();
  return (
    <div className="user-page">
      <div className="user-container">
      <h2>View Patient Appointments</h2>

      <div  className="form-group">
        <label>Select Patient: </label>
        <select style={{ color: 'black' }}
          value={selectedPatientID}
          onChange={(e) => setSelectedPatientID(e.target.value)}
        >
          <option value="">-- Select Patient --</option>
          {patients.map((p) => (
            <option key={p.patientID} value={p.patientID}>
              {p.name} ({p.patientID})
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
              <th>Doctor ID</th>
              <th>Date</th>
              <th>Time</th>
              
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app._id}>
                <td>{app.appointmentID}</td>
                <td>{app.doctorID}</td>
                <td>{app.date}</td>
                <td>{app.time}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
      className="btn-danger logout-btn"
      onClick={() => navigate("/user-dashboard")}>
      Logout
    </button>
    </div></div>
  );
};

export default ViewPatientAppointments;
