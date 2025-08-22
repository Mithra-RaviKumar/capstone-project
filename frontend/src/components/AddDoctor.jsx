import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/adminCommon.css"; 

const AddDoctor = () => {
  const [doctorID, setDoctorID] = useState("");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    const fetchNextID = async () => {
      try {
        const res = await axios.get("https://backend-ze0w.onrender.com/api/doctors/nextID");
        setDoctorID(res.data.doctorID);
      } catch (err) {
        console.error("Error fetching next doctor ID", err);
      }
    };

    fetchNextID();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://backend-ze0w.onrender.com/api/doctors", {
        name,
        specialization,
        phone,
      });

      setMessage(`Doctor added successfully with ID: ${res.data.doctorID}`);
      setName("");
      setSpecialization("");
      setPhone("");

      const newIDRes = await axios.get("https://backend-ze0w.onrender.com/api/doctors/nextID");
      setDoctorID(newIDRes.data.doctorID);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Error adding doctor");
    }
  };
const navigate = useNavigate();
  return (
    <div className="admin-page">
    <div className="admin-container">
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor ID: </label>
          <input type="text" value={doctorID} disabled />
        </div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Specialization: </label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone: </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Doctor</button>
        <button
      className="btn-danger logout-btn"
      onClick={() => navigate("/admin-dashboard")}
    >
      Logout
    </button>
      </form>
      {message && <p>{message}</p>}
    </div></div>
  );
};

export default AddDoctor;
