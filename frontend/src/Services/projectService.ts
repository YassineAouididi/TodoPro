import axios from 'axios';
import { Project } from '../types/project';
import { User } from '../types/user';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

export const getAllProjects = async () => {
  const res = await API.get('/projects');
  return res.data;
};

export const getProjectById = async (_id: string) => {
  const res = await API.get(`/projects/${_id}`);
  return res.data;
};

export const getTasksByProjectId = async (_id: string) => {
  try {
    const response = await API.get(`/?projectId=${_id}`);
    return { data: response.data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const createProject = async (projectData: Partial<Project>) => {
  const res = await API.post('/projects', projectData);
  return res.data;
};

/*export const createProject = (data: {
    name: string
    description: string
    status: 'not_started' | 'in_progress' | 'on_hold' | 'completed'
    progress: number
    startDate: string
    dueDate: string
}) => API.post('/projects', data)*/

export const updateProject = async (_id: string, projectData: Partial<Project>) => {
  const res = await API.put(`/projects/${_id}`, projectData);
  return res.data;
};

export const deleteProject = async (_id: string) => {
  const res = await API.delete(`/projects/${_id}`);
  return res.data;
};