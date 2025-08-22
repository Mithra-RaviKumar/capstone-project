import React, { useState } from "react";
import axios from "axios";
import "./Suggesdoctor.css";
import { useNavigate } from "react-router-dom";
import "../styles/adminCommon.css"; 
const ailments = [
  "Headache",
  "Fever",
  "Diabetes",
  "Fracture",
  "Cold",
  "Asthma",
  "Depression"
];

export default function SuggestDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [selectedAilment, setSelectedAilment] = useState("");

  const handleClick = async (ailment) => {
    setSelectedAilment(ailment);
    try {
      const res = await axios.get(`https://backend-ze0w.onrender.com/api/doctors/suggest/${ailment}`);
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
      setDoctors([]);
    }
  };
const navigate = useNavigate();
  return (
    <div className="suggest-container">
      <h2>Select an Ailment</h2>
      <div className="ailment-buttons">
        {ailments.map((ail, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(ail)}
          >
            {ail}
          </button>
        ))}
      </div>

      <h2>Suggested Doctors</h2>
      {doctors.length > 0 ? (
        <ul className="doctor-list">
          {doctors.map((doc) => (
            <li key={doc._id}>
              {doc.name} - {doc.specialization} - {doc.phone}
            </li>
          ))}
          
        </ul>
      ) : (
        selectedAilment && <p>No doctors found for this ailment.</p>
        
      )}
      <button
      className="btn-danger logout-btn"
      onClick={() => navigate("/admin-dashboard")}>
      Logout
    </button>
    </div>
  );
}
