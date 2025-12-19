import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskService from "../api/taskService";


export default function CreateTask(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title:"",
        priority:1,
        description:"default",
        state:1
    });
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form,
               [name]:name ==="priority" || name === "state" ? Number(value) : value
        })
    };

    const handleSubmit = async (e) => {
         e.preventDefault();

         try{
            await TaskService.create(form);
            navigate("/tasks");
         }catch(err){
            alert("Failed to create task");
         }
    };
    return (
      <div style={{padding:20}}>
         <h2>Create Task</h2>

         <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input name="title" value={form.title} onChange={handleChange} required></input>
            </div>
            <div>
                <label>Description:</label>
                <input name="description" value={form.description} onChange={handleChange} required></input>
            </div>
            <div>
                <label>Status</label>
                <select name="state" value={form.state} onChange={handleChange}>
                    <option value={0}>Pending</option>
                    <option value={1}>InProgress</option>
                    <option value={2}>Completed</option>
                     <option value={3}>Cancelled</option>
                </select>
            </div>
            <div>
                <label>Priority</label>
                <select name="priority" value={form.priority} onChange={handleChange}>
                    <option value={0}>Low</option>
                    <option value={1}>Medium</option>
                    <option value={2}>High</option>
                </select>
            </div>
            <button type="submit">Create</button>
         </form>
      </div>
    );
}