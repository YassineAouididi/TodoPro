import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Users, MessageSquare } from 'lucide-react';

import CreateTaskModal from '../components/modals/CreateTaskModal';
import { getProjectById, getTasksByProjectId } from '../Services/projectService';
import { getAllTasks } from '../Services/taskService';
import { User } from '../types/user';

interface Project {
  _id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  startDate: string;
  dueDate: string;
  created_by: User;
  created_at: string;
  teamMembers: User[];
}

interface Task {
  _id: string;
  project: Project[]
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  created_at: string;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
      fetchProjectTasks();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setIsLoading(true);
      const data = await getProjectById(id as string);
      setProject(data || []);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjectTasks = async () => {
  try {
    const { data, error } = await getTasksByProjectId(id as string);
    if (error) throw error;
    setTasks(data || []);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

  const handleTaskCreated = () => {
    fetchProjectTasks();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'not_started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {project.name}
            </h2>
            <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${getStatusColor(project.status)}`}>
              {project.status.replace('_', ' ')}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{project.description}</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Project Lead</dt>
              <dd className="mt-1 text-sm text-gray-900">{project.created_by.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Start Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(project.startDate)}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Due Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(project.dueDate)}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Team Members</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <div className="flex -space-x-2 overflow-hidden">
                  {project.teamMembers.map((member) => (
                    <span
                      key={member._id}
                      className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                    >
                      {member.name}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
            <div className="sm:col-span-3">
              <dt className="text-sm font-medium text-gray-500">Progress</dt>
              <dd className="mt-1">
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="ml-4 text-sm font-medium text-gray-500">{project.progress}%</span>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Tasks</h3>
          <button 
            onClick={() => setIsCreateTaskModalOpen(true)}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Task
          </button>
        </div>
        <div className="border-t border-gray-200">
          {tasks.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <div key={task._id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="mt-3 flex items-center space-x-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-sm text-gray-500">
                          Due: {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No tasks found for this project</p>
              <button
                onClick={() => setIsCreateTaskModalOpen(true)}
                className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create First Task
              </button>
            </div>
          )}
        </div>
      </div>

      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onTaskCreated={handleTaskCreated}
        projectId={project._id}
      />
    </div>
  );
};

export default ProjectDetails;