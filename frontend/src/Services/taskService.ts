import axios from 'axios';
import { Task } from '../types/task';

const API = axios.create({
  baseURL: 'http://localhost:5000',
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

export const getAllTasks = async () => {
  const res = await API.get('/api/tasks');
  return res.data;
};

export const getTaskById = async (_id: string) => {
  const res = await API.get(`/api/tasks/${_id}`);
  return res.data;
};

export const createTask = async (taskData: Partial<Task>) => {
  const res = await API.post('/api/tasks', taskData);
  return res.data;
};

export const updateTask = async (_id: string, taskData: Partial<Task>) => {
  const res = await API.put(`/api/tasks/${_id}`, taskData);
  return res.data;
};

export const deleteTask = async (_id: string) => {
  const res = await API.delete(`/api/tasks/${_id}`);
  return res.data;
};