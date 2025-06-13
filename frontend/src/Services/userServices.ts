import axios from 'axios'
import { User } from '../types/user';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

export const createUserAPI = (data: {
  name: string
  email: string
  password: string
  role: 'admin' | 'manager' | 'member'
}) => API.post('/users', data)


export const getAllTasks = async () => {
  const response = await axios.get('/tasks')
  return response.data
}

export const getAllUsers = async () => {
  const response = await API.get('/users');
  return response.data;
};


export const updateUser = async (_id: string, userData: Partial<User> | FormData) => {
  const response = await API.put(`/users/${_id}`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteUser = async (_id: string) => {
  const response = await API.delete(`/users/${_id}`);
  return response.data;
};