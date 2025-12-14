import { useState } from "react";
import api from "../api/api";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: ""
  });
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
        await api.post("/auth/register", form);
        alert("Registration successfull");
    }catch (err){
        console.error(err);
        alert("Failed to register");
    }
  };
  return(
    <div>
        <h2>Register</h2>
        <inpu type="text" placeholder="Full Name" 
         onChange={(e) => setForm({...form, fullName:e.target.value})}/>

         <input type="email" placeholder="Email" 
         onChange={(e) => setForm({...form, email:e.target.value})}/>

         <input type="password" placeholder="password"
         onChange={(e) => setForm({ ...form,email:e.target.value})}/>

         <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
