import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/userCommon.css';
import { useNavigate } from "react-router-dom";
const AddAilment = () => {
  const [patientID, setPatientID] = useState("");
  const [ailments, setAilments] = useState("");
  const [message, setMessage] = useState("");
  const [patients, setPatients] = useState([]);

  
  useEffect(() => {
    axios.get("https://backend-ze0w.onrender.com/api/patients")
      .then(res => setPatients(res.data))
      .catch(err => console.error("Error fetching patients", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientID) {
      setMessage("Please select a patient");
      return;
    }

    try {
      const res = await axios.post("https://backend-ze0w.onrender.com/api/patients/ailment", {
        patientID,
        ailments: ailments.split(",").map(a => a.trim())
      });
      setMessage(res.data.message);
      setAilments("");
    } catch (err) {
      setMessage(err.response?.data?.error || "Error adding ailment");
    }
  };
const navigate = useNavigate();
  return (
    <div className="user-page">
      <div className="user-container">
        <h2>Add Patient Ailment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient:</label>
            <select style={{ color: 'black' }}
              value={patientID}
              onChange={(e) => setPatientID(e.target.value)}
              required
            >
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p.patientID} value={p.patientID}>
                  {p.patientID} - {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Ailments (comma separated):</label>
            <input
              type="text"
              value={ailments}
              onChange={(e) => setAilments(e.target.value)}
              required
              placeholder="e.g., Fever, Cold"
            />
          </div>

          <button type="submit">Add Ailment</button>
          <button
      className="btn-danger logout-btn"
      onClick={() => navigate("/user-dashboard")}
    >
      Logout
    </button>
        </form>
        
        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
};

export default AddAilment;
