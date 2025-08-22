import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/adminCommon.css";

function ViewDoctor() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-ze0w.onrender.com/api/doctors")
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        console.error("Error fetching doctors", err);
      });
  }, []);
const navigate = useNavigate();
  return (
    <div className="admin-page">
    <div className="admin-container">
      <h2>Doctor List</h2>
      {doctors.length > 0 ? (
        <table className="table-dark">
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.doctorID}</td>
                <td>{doc.name}</td>
                <td>{doc.specialization}</td>
                <td>{doc.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No doctors found</p>
        
      )
      }
      <button
      className="btn-danger logout-btn"
      onClick={() => navigate("/admin-dashboard")}
    >
      Logout
    </button>
    </div></div>
  );
}

export default ViewDoctor;
