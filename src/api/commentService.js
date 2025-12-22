import { data } from "react-router-dom";
import api from "./api";

const CommentService = {
    getByTask: (taskId) => api.get(`/Comments/task/${taskId}`),
    add:(taskId,text) => api.post("/Comments", {
        taskId:taskId,
        text:text
    })
}

export default CommentService;