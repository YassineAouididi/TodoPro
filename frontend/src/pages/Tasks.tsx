import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, CheckCircle, Clock, Circle, AlertCircle, CalendarClock } from 'lucide-react';
import CreateTaskModal from '../components/modals/CreateTaskModal';
import { useAuth } from '../context/AuthContext';
import { getAllTasks } from '../Services/taskService';
import toast from 'react-hot-toast';
import TaskCard from '../components/TaskCard';
import { User } from '../types/user';

interface Task {
  _id: string;
  project_id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  created_at: string;
  assignees: User[];
}

const Tasks: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await getAllTasks();
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskCreated = () => {
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
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
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'not_started':
        return <Circle className="h-5 w-5 text-gray-400" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <div className="mt-3 sm:mt-0">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <select
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <select
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <div key={task._id} className="p-6">
             <div className="flex items-start">
                <div className="flex-shrink-0 pt-1">
                  {getStatusIcon(task.status)}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarClock className="mr-1.5 h-4 w-4" />
                      <span>Due: {formatDate(task.dueDate)}</span>
                    </div>
                    <div className="flex -space-x-2">
                      {task.assignees.slice(0, 3).map((assignee, index) => (
                        <div
                          key={index}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-800 ring-2 ring-white"
                          title={assignee.name}
                        >
                          {assignee.name.charAt(0)}
                        </div>
                      ))}
                      {task.assignees.length > 3 && (
                        <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-800 ring-2 ring-white">
                          +{task.assignees.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery || filterStatus !== 'all' || filterPriority !== 'all'
              ? 'Try adjusting your search or filters to find what you\'re looking for.'
              : 'Get started by creating a new task.'}
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </button>
          </div>
        </div>
      )}

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
};

export default Tasks;