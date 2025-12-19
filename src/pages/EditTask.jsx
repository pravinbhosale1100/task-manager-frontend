import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskService from "../api/taskService";

export default function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        id:null,
        title: "",
        description:"default",
        priority: 1,
        state: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTask = async () => {
            try {
                const res = await TaskService.getById(id);

                setForm({
                    id:res.data.id,
                    title: res.data.title,
                    priority: res.data.priority,
                    description:res.data.description,
                    state: res.data.state
                });
            } catch {
                alert("Failed to load task");
            } finally {
                setLoading(false)
            }
        };
        loadTask();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,[name]:name === "priority" || name === "state" ?Number(value):value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await TaskService.update(id, form);
            navigate("/tasks");
        } catch {
            alert("failed to update task");
        }
    };

    if (loading) return <p>Loading Task...</p>

    return (
        <div style={{ padding: 20 }}>
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input name="title" value={form.title} onChange={handleChange} required />
                </div>
                <div>
                <label>Description:</label>
                <input name="description" value={form.description} onChange={handleChange} required></input>
            </div>
                <div>
                    <label>Priority:</label>
                    <select name="priority" value={form.priority} onChange={handleChange}>
                        <option value={0}>Low</option>
                        <option value={1}>Medium</option>
                        <option value={2}>High</option>
                    </select>
                </div>
                <div>
                    <label>Status:</label>
                    <select name="state" value={form.state} onChange={handleChange}>
                        <option value={0}>Pending</option>
                        <option value={1}>In Progress</option>
                        <option value={2}>Done</option>
                    </select>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}