import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/userCommon.css';
import { useNavigate } from "react-router-dom";
const AddPatient = () => {
  const [patientID, setPatientID] = useState(""); 
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    axios.get("http://localhost:5000/api/patients/next-id")
      .then(res => setPatientID(res.data.patientID))
      .catch(err => console.error("Error fetching next Patient ID", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/patients", {
      patientID,
      name,
      age,
      gender,
      contact
    })
    .then(res => {
      setMessage(res.data.message);
      setName(""); setAge(""); setGender(""); setContact("");
      
      return axios.get("http://localhost:5000/api/patients/next-id");
    })
    .then(res => setPatientID(res.data.patientID))
    .catch(err => setMessage(err.response?.data?.error || "Error adding patient"));
  };
const navigate = useNavigate();
  return (
    <div className="user-page">
      <div className="user-container">
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient ID: </label>
          <input type="text" value={patientID} disabled />
        </div>
        <div className="form-group">
          <label>Name: </label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Age: </label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Gender: </label>
          <select style={{ color: 'black' }} value={gender} onChange={e => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Contact: </label>
          <input type="text" value={contact} onChange={e => setContact(e.target.value)} required />
        </div>
        <button type="submit">Add Patient</button>
        <button
      className="btn-danger logout-btn"
      onClick={() => navigate("/user-dashboard")}
    >
      Logout
    </button>
      </form>
      {message && <p>{message}</p>}
    </div></div>
  );
};

export default AddPatient;
