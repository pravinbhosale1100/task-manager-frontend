import api from "./api";

const TaskService = {
  getAll: (queryParams) => api.get("/tasks",{params:queryParams}),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post("/tasks", data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
  updateStatus:(id,state) => api.patch(`/tasks/${id}/status`,{state})
};

export default TaskService;