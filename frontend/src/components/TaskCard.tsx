import React from 'react';
import { CalendarClock, CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
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

  const getPriorityClass = (priority: string) => {
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
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-1">
          {getStatusIcon(task.status)}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-900">{task.title}</p>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityClass(task.priority)}`}>
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
  );
};

export default TaskCard;