import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";
export default function AdminDashboard() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (adminId === "AD-001" && password === "AD-001") {
      navigate("/add-doctor");
    } else if (adminId === "AD-002" && password === "AD-002") {
      navigate("/view-doctor");
    } else if (adminId === "AD-003" && password === "AD-003") {
      navigate("/edit-doctor");
    } else if (adminId === "AD-004" && password === "AD-004") {
      navigate("/delete-doctor");
    } else if (adminId === "AD-005" && password === "AD-005") {
      navigate("/suggest-doctor");
    } else {
      alert("Invalid Admin ID or Password");
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
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Admin ID: </label>
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login as Admin</button>
      </form>
    </div>
    </div>
  );
}
