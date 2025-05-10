import React, { useEffect, useState } from 'react';
import {
  getTasks,
  addTask,
  deleteTask,
  toggleTaskComplete,
  updateTask
} from './todoservice';


function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };
  

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!title) return;
    if (editingTask) {
      await updateTask(editingTask.id, title, description);
      setEditingTask(null);
    } else {
      const newTask = await addTask(title, description);
      setTasks([...tasks, newTask]);
    }
    setTitle('');
    setDescription('');
    setShowForm(false);
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = async (id) => {
    await toggleTaskComplete(id);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setShowForm(true);
  };

  
  

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <button className="add-button" onClick={() => {
        setShowForm(!showForm);
        setEditingTask(null);
        setTitle('');
        setDescription('');
      }}>
        {showForm ? 'Cancel' : 'Add Task'}
      </button>

      {showForm && (
        <div className="task-form">
          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAddTask}>{editingTask ? 'Update Task' : 'Add Task'}</button>
        </div>
      )}

      {tasks.map((task, idx) => (
        <div key={task.id} className="task-box">
          <strong style={{ textDecoration: 'none' }}>
            {idx + 1}. {task.title}
            
          </strong>
          <p>{task.description}</p>
          {task.completed === 'saved' ? (
  <span className="saved-label"> - Saved</span>
) : (
  <button className="complete-btn" onClick={() => handleToggleComplete(task.id)}>
    Complete
  </button>
)}

<div>
          <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
            Delete
          </button>

          <button className="edit-btn" onClick={() => handleEdit(task)}>
            Edit
          </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
