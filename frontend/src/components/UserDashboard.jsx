import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";
export default function UserDashboard() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (userId === "US-001" && password === "US-001") {
      navigate("/add-patient");
    } 
    else if (userId ==="US-002" && password==="US-002") { 
      navigate("/add-ailment");
    }
    else if (userId ==="US-003" && password==="US-003") { 
      navigate("/modify-ailment");
    }
      else if (userId ==="US-004" && password==="US-004") { 
      navigate("/viewdocapp");
    }
    else if (userId ==="US-005" && password==="US-005") { 
      navigate("/reqapp");
    }
    else if (userId ==="US-006" && password==="US-006") { 
      navigate("/allapp");
    }
    else {
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
      <h2>User Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID: </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}
