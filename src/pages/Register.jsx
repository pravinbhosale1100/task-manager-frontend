import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
   const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    password: "",
    role: ""
  });

  const gotoLogin = async (e) => {
     e.preventDefault();
     navigate("/login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registration successfull");
    } catch (err) {
      console.error(err);
      alert("Failed to register");
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="User Name"
        onChange={(e) => setForm({ ...form, userName: e.target.value })} />

      <input type="password" placeholder="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
   
      <input type="text" placeholder="role"
        onChange={(e) => setForm({ ...form, role: e.target.value })} />
     
      <button onClick={handleSubmit}>Register</button>
      <button onClick={gotoLogin}>Go To Login</button>
    </div>
  );
}
