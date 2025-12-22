import { useEffect, useState } from "react";
import CommentService from "../api/commentService"

export default function TaskComments({ taskId }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        loadComments();
    }, [taskId]);

    const loadComments = async () => {
        const res = await CommentService.getByTask(taskId);
        setComments(res.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await CommentService.add(taskId,text )
        setText("");
        loadComments();
    };

    return(
        <div>
            <h4>Comments</h4>
            <form onSubmit={handleSubmit}>
                <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add comment" required/>
                <button type="submit">Add</button>
            </form>
            <ul>
                {comments.map(c => (
                 <li key={c.id}>{c.text}</li>
                ))}
            </ul>
        </div>
    );
}