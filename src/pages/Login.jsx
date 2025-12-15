import React, { useContext, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);
  
  const [form,setForm] = useState({
    userName:"",
    password:""
  })

  const [error, setError] = useState("");
  const registerUser = async(e) =>{
      e.preventDefault();
      setError("");
      navigate("/register",{replace:true})
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    try{
        // Call ASP.NET API -> /api/auth/login
        const response =  await api.post("/auth/login",form);
        // Trigger AuthContext login()
        login(response.data.token);
        // Redirect to Dashboard (home)
        navigate("/",{replace:true});
    }catch(err){
        console.error(error);
        setError("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="userName"
          value={form.userName}
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br />

        <button type="submit">Login</button>
        <button onClick={registerUser}>Go To Register</button>
      </form>
    </div>
  );
}