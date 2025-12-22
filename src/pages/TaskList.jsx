import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import TaskService from "../api/taskService";
import { Link } from "react-router-dom";
import TaskComments from "./TaskComments";
import React from "react";
export default function TaskList() {
    const { user } = useContext(AuthContext);

    const [task, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const handelDelete = async (taskId) => {
        const confirmDelete = window.confirm("Are you sure want to delete this task?");
        if (!confirmDelete) return;
        try {
            await TaskService.delete(taskId);
            setTasks((prev) => prev.filter((t) => t.id !== taskId));
        } catch (err) {
            alert("Failed to delete task");
        }
    };

    const updateStatus = async (taskId, taskState) => {
        try {
            await TaskService.updateStatus(taskId, taskState);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, state: taskState } : task
                )
            );
        } catch (err) {
            alert("Faild to Update Status");
        }
    }

    const toggle = (taskId) => {
        setExpandedTaskId(prev => prev === taskId ? null : taskId);
    }

    useEffect(() => {
        if (!user) return; // wait for auth

        const fetchTasks = async () => {
            setLoading(true);

            try {
                const response = await TaskService.getAll({
                    pageNumber: 1,
                    pageSize: 10
                });

                setTasks(response.data.data.items);
            } catch (err) {
                console.error(err);
                setError("Failed to load tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [user]);

    //UI Part 
    if (loading) return <p>Loading Task...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>

    return (
        <div style={{ padding: "20px" }}>
            <h2>Task List</h2>
            {task.length === 0 ? (
                <p>No task found.</p>
            ) : (
                <table border="1" cellPadding="8" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {task.map((task) => (
                            <React.Fragment key={task.id}>
                                <tr>
                                    <td>{task.title}</td>
                                    <td>{task.state}</td>
                                    <td>{task.priority}</td>
                                    <td>
                                        <Link to={`/tasks/edit/${task.id}`}>Edit</Link>
                                    </td>
                                    <td>
                                        {task.state === 0 && (
                                            <button onClick={() => updateStatus(task.id, 1)}>
                                                Mark in progress
                                            </button>
                                        )}
                                        {task.state === 1 && (
                                            <button onClick={() => updateStatus(task.id, 2)}>
                                                Mark done
                                            </button>
                                        )}
                                        {task.state === 2 && <p>✅ Completed</p>}
                                    </td>
                                    <td><button onClick={() => handelDelete(task.id)}>Delete</button></td>
                                </tr>
                                {/*comments row */}
                                <tr>
                                    <td colSpan={"6"}>
                                        {expandedTaskId === task.id && (
                                            <TaskComments taskId={task.id} />
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => toggle(task.id)}>
                                            {expandedTaskId === task.id ? "Hide Comments" : "Show Comments"}
                                        </button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    )
}

