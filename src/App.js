
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import TaskList from "./pages/TaskList";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element=
        {<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
      <Route path="/tasks" element=
        {<ProtectedRoute>
          <TaskList />
        </ProtectedRoute>} />
      <Route path="/tasks/create" element=
        {<ProtectedRoute>
          <CreateTask />
        </ProtectedRoute>} />
      <Route path="tasks/edit/:id" element={
        <ProtectedRoute>
          <EditTask/>
        </ProtectedRoute>
      }/>  
    </Routes>

  );
}

export default App;
