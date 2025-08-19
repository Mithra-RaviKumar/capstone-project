import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";
const ReportDashboard = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogin = (e) => {
    e.preventDefault();

    if (userId === "re-001" && password === "re-001") {
      navigate("/reporter");
    } else {
      alert("Invalid User ID or Password");
    }
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <Link to="/home" onClick={toggleSidebar}>Home</Link>
        <Link to="/signup" onClick={toggleSidebar}>Sign Up</Link>
        <Link to="/signin" onClick={toggleSidebar}>Sign In</Link>
        <Link to="/about" onClick={toggleSidebar}>About</Link>
        <Link to="/contact" onClick={toggleSidebar}>Contact</Link>
      </div>

      <div className="menu-icon" onClick={toggleSidebar}>&#9776;</div>

    <div className="dashboard-box" >
    
      <h2>Reporter Dashboard Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "15px" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ReportDashboard;
