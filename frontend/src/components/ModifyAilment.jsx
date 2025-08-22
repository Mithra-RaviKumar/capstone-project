import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/userCommon.css';
import { useNavigate } from "react-router-dom";
const ModifyAilment = () => {
  const [patientID, setPatientID] = useState("");
  const [ailments, setAilments] = useState("");
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    if (!patientID) return;

    axios
      .get(`https://backend-ze0w.onrender.com/api/patients/ailment/${patientID}`)
      .then((res) => {
        setAilments(res.data.ailments.join(", "));
      })
      .catch((err) => {
        setAilments("");
        console.error("Error fetching patient ailments", err);
      });
  }, [patientID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://backend-ze0w.onrender.com/api/patients/ailment/${patientID}`, {
        ailments: ailments.split(",").map((a) => a.trim()),
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error updating ailments");
    }
  };
const navigate = useNavigate();
  return (
    <div className="user-page">
      <div className="user-container">
      <h2>Modify Patient Ailments</h2>
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
          <label>Ailments (comma separated): </label>
          <input
            type="text"
            value={ailments}
            onChange={(e) => setAilments(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Ailments</button>
        <button
      className="btn-danger logout-btn"
      onClick={() => navigate("/user-dashboard")}>
      Logout
    </button>
      </form>
      {message && <p>{message}</p>}
    </div></div>
  );
};

export default ModifyAilment;
