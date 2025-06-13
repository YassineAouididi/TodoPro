import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types/project';
import { MoreHorizontal, Clock } from 'lucide-react';

interface ProjectTableProps {
  projects: Project[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`} className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <p className="truncate text-sm font-medium text-blue-600">{project.name}</p>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="ml-2 flex flex-shrink-0">
                    <button className="inline-flex items-center rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {project.description.length > 100 
                        ? project.description.substring(0, 100) + '...' 
                        : project.description}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <Clock className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <p>
                      Due by <span className="font-medium">{formatDate(project.dueDate)}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="flex flex-1 items-center justify-between">
                      <div>
                        <div className="inline-flex -space-x-1 overflow-hidden">
                          {project.teamMembers.slice(0, 3).map((member, index) => (
                            <div
                              key={index}
                              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-800 ring-2 ring-white"
                              title={member.name}
                            >
                              {member.name.charAt(0)}
                            </div>
                          ))}
                          {project.teamMembers.length > 3 && (
                            <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-800 ring-2 ring-white">
                              +{project.teamMembers.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-gray-900">
                          {project.progress}%
                        </span>
                        <div className="ml-2 w-32 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-1.5 bg-blue-600"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTable;