import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/adminCommon.css";
function EditDoctor() {
  const [doctorID, setDoctorID] = useState("");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const fetchDoctor = () => {
    axios
      .get(`http://localhost:5000/api/doctors/doctorid/${doctorID}`)
      .then((res) => {
        if (res.data) {
          setName(res.data.name);
          setSpecialization(res.data.specialization);
          setPhone(res.data.phone);
          setMessage("");
        } else {
          setMessage("Doctor not found");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error fetching doctor");
      });
  };

  const updateDoctor = () => {
    axios
      .put(`http://localhost:5000/api/doctors/doctorid/${doctorID}`, {
        name,
        specialization,
        phone,
      })
      .then((res) => {
        setMessage("Doctor updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error updating doctor");
      });
  };
const navigate = useNavigate();
  return (
    <div className="admin-page">
    <div className="admin-container">
      <h2>Edit Doctor</h2>

      <div>
        <input
          type="text"
          placeholder="Enter Doctor ID"
          value={doctorID}
          onChange={(e) => setDoctorID(e.target.value)}
        />
        <button onClick={fetchDoctor}>Fetch Doctor</button>
      </div>

      {name && (
        <>
          <div>
            <input
              type="text"
              placeholder="Doctor Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button onClick={updateDoctor}>Update Doctor</button>
          
        </>
      )}

      {message && <p>{message}</p>}
      <button
      className="btn-danger logout-btn"
      onClick={() => navigate("/admin-dashboard")}
    >
      Logout
    </button>
    </div></div>
  );
}

export default EditDoctor;
