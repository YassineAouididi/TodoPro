import React, { useState, useEffect } from 'react';
import { BarChart, PieChart, Calendar, ArrowUpRight } from 'lucide-react';
import ProjectProgressChart from '../components/charts/ProjectProgressChart';
import TaskStatusChart from '../components/charts/TaskStatusChart';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/modals/CreateProjectModal';
// Removed: import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
// Add your API services:
import { getAllProjects } from '../Services/projectService';
import { getAllTasks } from '../Services/taskService';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  start_date: string;
  due_date: string;
  created_by: string;
  created_at: string;
}

interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
  });
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch all projects
      const allProjects: Project[] = await getAllProjects();
      // Sort by created_at descending and get the 3 most recent
      const projectsData = allProjects
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 3);

      // Fetch all tasks
      const allTasks: Task[] = await getAllTasks();
      // Sort by created_at descending and get the 5 most recent
      const tasksData = allTasks
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      setProjects(projectsData);
      setRecentTasks(tasksData);
      setStats({
        totalProjects: allProjects.length,
        completedProjects: allProjects.filter(p => p.status === 'completed').length,
        totalTasks: allTasks.length,
        completedTasks: allTasks.filter(t => t.status === 'completed').length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectCreated = () => {
    fetchDashboardData();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ...rest of your component remains unchanged... */}
      {/* (No changes needed below this line) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="mt-3 sm:mt-0">
          <button 
            onClick={() => setIsCreateProjectModalOpen(true)}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create New Project
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Projects</dt>
          <dd className="mt-1 text-2xl font-semibold text-gray-900">{stats.totalProjects}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Completed Projects</dt>
          <dd className="mt-1 flex items-baseline text-2xl font-semibold text-green-600">
            {stats.completedProjects}
            <span className="ml-2 text-sm font-medium text-gray-500">
              {stats.totalProjects ? Math.round((stats.completedProjects / stats.totalProjects) * 100) : 0}%
            </span>
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Tasks</dt>
          <dd className="mt-1 text-2xl font-semibold text-gray-900">{stats.totalTasks}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Completed Tasks</dt>
          <dd className="mt-1 flex items-baseline text-2xl font-semibold text-green-600">
            {stats.completedTasks}
            <span className="ml-2 text-sm font-medium text-gray-500">
              {stats.totalTasks ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%
            </span>
          </dd>
        </div>
      </dl>

      {/* Charts 
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Project Progress</h3>
            <div className="h-64">
              <ProjectProgressChart />
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Task Status</h3>
            <div className="h-64">
              <TaskStatusChart />
            </div>
          </div>
        </div>
      </div>*/}

      {/* Recent Projects */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Projects</h3>
          <a href="/projects" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
            View all <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          {projects.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No projects found. Create your first project!</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Tasks</h3>
          <a href="/tasks" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
            View all <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        <div className="border-t border-gray-200">
          {recentTasks.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {recentTasks.map((task) => (
                <div key={task.id} className="p-4">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      task.status === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status.replace('_', ' ')}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No tasks found.</p>
            </div>
          )}
        </div>
      </div>

      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default Dashboard;