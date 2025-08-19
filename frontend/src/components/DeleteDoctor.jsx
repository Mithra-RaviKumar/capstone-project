import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/adminCommon.css";

export default function DeleteDoctor() {
  const [doctorID, setDoctorID] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!doctorID.trim()) {
      setMessage("Please enter a Doctor ID");
      return;
    }

    try {
      const res = await axios.delete(`http://localhost:5000/api/doctors/${doctorID}`);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error deleting doctor");
    }
  };
const navigate = useNavigate();
  return (
    <div className="admin-page">
    <div className="admin-container">
      <h2>Delete Doctor</h2>
      <input
        type="text"
        placeholder="Enter Doctor ID"
        value={doctorID}
        onChange={(e) => setDoctorID(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={handleDelete} style={{ padding: "8px 12px", backgroundColor: "red", color: "white" }}>
        Delete Doctor
      </button>
      <button
      className="btn-danger logout-btn"
      onClick={() => navigate("/admin-dashboard")}
    >
      Logout
    </button>
      {message && <p>{message}</p>}
    </div></div>
  );
}
