import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";



export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard</h1>
            <p>You are logged in successfully.</p>
            <p>Welcome <strong>{user?.userName}</strong></p>
            <p>
                Role: <strong>{user?.role}</strong>
            </p>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}