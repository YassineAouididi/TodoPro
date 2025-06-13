import { Project } from '../types/project';
import { Task } from '../types/task';
import { User } from '../types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: null
  },
  {
    id: '2',
    name: 'John Manager',
    email: 'manager@example.com',
    role: 'manager',
    avatar: null
  },
  {
    id: '3',
    name: 'Jane Member',
    email: 'member@example.com',
    role: 'member',
    avatar: null
  },
  {
    id: '4',
    name: 'Alice Developer',
    email: 'alice@example.com',
    role: 'member',
    avatar: null
  },
  {
    id: '5',
    name: 'Bob Designer',
    email: 'bob@example.com',
    role: 'member',
    avatar: null
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with new branding and improved UX.',
    status: 'in_progress',
    progress: 75,
    startDate: '2023-01-15',
    dueDate: '2023-03-30',
    teamMembers: [mockUsers[1], mockUsers[2], mockUsers[3]],
    createdBy: mockUsers[1]
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Develop a new mobile application for both iOS and Android platforms.',
    status: 'in_progress',
    progress: 40,
    startDate: '2023-02-10',
    dueDate: '2023-06-15',
    teamMembers: [mockUsers[1], mockUsers[3], mockUsers[4]],
    createdBy: mockUsers[1]
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    description: 'Launch a comprehensive marketing campaign for Q2 product release.',
    status: 'completed',
    progress: 100,
    startDate: '2023-01-05',
    dueDate: '2023-02-28',
    teamMembers: [mockUsers[2], mockUsers[4]],
    createdBy: mockUsers[0]
  },
  {
    id: '4',
    name: 'Database Migration',
    description: 'Migrate from legacy database system to new cloud-based solution.',
    status: 'not_started',
    progress: 0,
    startDate: '2023-04-01',
    dueDate: '2023-05-15',
    teamMembers: [mockUsers[0], mockUsers[3]],
    createdBy: mockUsers[0]
  },
  {
    id: '5',
    name: 'Employee Training Program',
    description: 'Develop and implement comprehensive training program for new hires.',
    status: 'on_hold',
    progress: 25,
    startDate: '2023-03-01',
    dueDate: '2023-07-30',
    teamMembers: [mockUsers[0], mockUsers[1], mockUsers[2]],
    createdBy: mockUsers[1]
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Design new homepage',
    description: 'Create mockups for the new homepage design based on the approved style guide.',
    status: 'completed',
    priority: 'high',
    dueDate: '2023-02-15',
    assignees: [mockUsers[4]],
    comments: [
      {
        id: '101',
        user: mockUsers[1],
        text: 'Looking great! Just a few minor adjustments needed.',
        createdAt: '2023-02-14T14:30:00Z'
      }
    ]
  },
  {
    id: '2',
    projectId: '1',
    title: 'Implement responsive design',
    description: 'Ensure the website works well on all devices and screen sizes.',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2023-03-10',
    assignees: [mockUsers[3]],
    comments: []
  },
  {
    id: '3',
    projectId: '1',
    title: 'Content migration',
    description: 'Transfer all content from the old website to the new one.',
    status: 'not_started',
    priority: 'medium',
    dueDate: '2023-03-20',
    assignees: [mockUsers[2]],
    comments: []
  },
  {
    id: '4',
    projectId: '2',
    title: 'App wireframing',
    description: 'Create detailed wireframes for all app screens.',
    status: 'completed',
    priority: 'high',
    dueDate: '2023-02-25',
    assignees: [mockUsers[4]],
    comments: [
      {
        id: '102',
        user: mockUsers[1],
        text: 'Wireframes approved by the client.',
        createdAt: '2023-02-24T16:45:00Z'
      }
    ]
  },
  {
    id: '5',
    projectId: '2',
    title: 'Frontend development',
    description: 'Implement the UI components based on the approved designs.',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2023-04-15',
    assignees: [mockUsers[3]],
    comments: []
  },
  {
    id: '6',
    projectId: '2',
    title: 'Backend API development',
    description: 'Create the necessary API endpoints for the app.',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2023-04-30',
    assignees: [mockUsers[3]],
    comments: []
  },
  {
    id: '7',
    projectId: '3',
    title: 'Create social media content',
    description: 'Develop engaging content for various social media platforms.',
    status: 'completed',
    priority: 'medium',
    dueDate: '2023-01-25',
    assignees: [mockUsers[4], mockUsers[2]],
    comments: []
  },
  {
    id: '8',
    projectId: '3',
    title: 'Schedule email campaign',
    description: 'Set up and schedule all email communications for the campaign.',
    status: 'completed',
    priority: 'medium',
    dueDate: '2023-02-10',
    assignees: [mockUsers[2]],
    comments: []
  },
  {
    id: '9',
    projectId: '4',
    title: 'Database analysis',
    description: 'Analyze current database structure and identify migration requirements.',
    status: 'not_started',
    priority: 'high',
    dueDate: '2023-04-15',
    assignees: [mockUsers[0], mockUsers[3]],
    comments: []
  },
  {
    id: '10',
    projectId: '5',
    title: 'Develop training materials',
    description: 'Create comprehensive training materials for different departments.',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2023-04-30',
    assignees: [mockUsers[2]],
    comments: []
  },
  {
    id: '11',
    projectId: '2',
    title: 'Quality assurance testing',
    description: 'Perform thorough testing of all app features and fix bugs.',
    status: 'not_started',
    priority: 'high',
    dueDate: '2023-05-15',
    assignees: [mockUsers[3], mockUsers[4]],
    comments: []
  },
  {
    id: '12',
    projectId: '1',
    title: 'SEO optimization',
    description: 'Implement SEO best practices across the new website.',
    status: 'not_started',
    priority: 'medium',
    dueDate: '2023-03-25',
    assignees: [mockUsers[2]],
    comments: []
  },
  {
    id: '13',
    projectId: '5',
    title: 'Schedule training sessions',
    description: 'Coordinate and schedule training sessions with department heads.',
    status: 'not_started',
    priority: 'low',
    dueDate: '2023-06-15',
    assignees: [mockUsers[1]],
    comments: []
  },
  {
    id: '14',
    projectId: '4',
    title: 'Data backup',
    description: 'Create complete backups of all data before migration begins.',
    status: 'not_started',
    priority: 'high',
    dueDate: '2023-04-20',
    assignees: [mockUsers[0]],
    comments: []
  },
  {
    id: '15',
    projectId: '3',
    title: 'Campaign performance analysis',
    description: 'Analyze the results of the marketing campaign and create a detailed report.',
    status: 'completed',
    priority: 'medium',
    dueDate: '2023-02-28',
    assignees: [mockUsers[1], mockUsers[2]],
    comments: [
      {
        id: '103',
        user: mockUsers[0],
        text: 'Great results! The campaign exceeded our expectations.',
        createdAt: '2023-03-01T10:15:00Z'
      }
    ]
  }
];