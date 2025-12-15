import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { isAdmin, isUser } from "../utils/roleUtils";


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
            <hr />
            {/*Admin user */}
            {isAdmin(user) && (
                <div>
                    <h3>Admin Panel</h3>
                    <ul>
                        <li>View All Tasks</li>
                        <li>Create Task</li>
                        <li>Delete Any Task</li>
                        <li>Manage Users</li>
                    </ul>
                </div>
            )}
            {/* USER UI */}
            {isUser(user) && (
                <div>
                    <h3>User Panel</h3>
                    <ul>
                        <li>View My Tasks</li>
                        <li>Update My Tasks</li>
                        <li>Add Comments</li>
                    </ul>
                </div>
            )}
            <br />
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}