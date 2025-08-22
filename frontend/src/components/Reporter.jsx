import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/userCommon.css';
import { useNavigate } from "react-router-dom";

export default function Reporter() {
  const [doctors, setDoctors] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    doctorID: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  
  useEffect(() => {
    axios
      .get("https://backend-ze0w.onrender.com/api/doctors")
      .then((res) => {
        
        if (Array.isArray(res.data)) {
          setDoctors(res.data);
        } else if (Array.isArray(res.data.doctors)) {
          setDoctors(res.data.doctors);
        } else {
          setDoctors([]);
        }
      })
      .catch((err) => console.error("Error fetching doctors:", err));

    axios
      .get("https://backend-ze0w.onrender.com/api/leaves")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setLeaves(res.data);
        } else if (Array.isArray(res.data.leaves)) {
          setLeaves(res.data.leaves);
        } else {
          setLeaves([]);
        }
      })
      .catch((err) => console.error("Error fetching leaves:", err));
  }, []);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://backend-ze0w.onrender.com/api/leaves", {
        doctorID: formData.doctorID,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason
      });
      alert("Leave added successfully!");
      setFormData({ doctorID: "", startDate: "", endDate: "", reason: "" });
      const refreshed = await axios.get("https://backend-ze0w.onrender.com/api/leaves");
      setLeaves(Array.isArray(refreshed.data) ? refreshed.data : refreshed.data.leaves || []);
    } catch (err) {
      console.error("Error adding leave:", err.response?.data || err.message);
    }
  };
const navigate = useNavigate();
  return (
    <div className="user-page">
      <div className="user-container">
      <h2>Reporter Panel - Doctor Leave Management</h2>

      
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <select style={{ color: 'black' }}
          name="doctorID"
          value={formData.doctorID}
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.doctorID} value={doc.doctorID}>
              {doc.doctorID} - {doc.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={formData.reason}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Leave</button>
        
      </form>
    
      <button
      className="btn-danger logout-btn"
      onClick={() => navigate("/reporter-dashboard")}>
      Logout
    </button>
    </div></div>
  );
}
