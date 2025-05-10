import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addTask = async (title, description) => {
  const res = await axios.post(API_URL, { title, description });
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const toggleTaskComplete = async (id) => {
    await axios.put(`${API_URL}/${id}/toggle`);
  };

export const updateTask = async (id, title, description) => {
    const res = await axios.put(`${API_URL}/${id}`, { title, description });
    return res.data;
  };

  
  
