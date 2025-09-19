import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTask = () => {
    axios.post("http://localhost:8080/api/tasks", { title, completed: false })
      .then(res => setTasks([...tasks, res.data]));
    setTitle("");
  };

  const toggleTask = (id, completed) => {
    axios.put(`http://localhost:8080/api/tasks/${id}`, { id, title: tasks.find(t => t.id === id).title, completed: !completed })
      .then(res => setTasks(tasks.map(t => (t.id === id ? res.data : t))));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8080/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <span style={{ textDecoration: t.completed ? "line-through" : "" }}>
              {t.title}
            </span>
            <button onClick={() => toggleTask(t.id, t.completed)}>
              {t.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskApp;
