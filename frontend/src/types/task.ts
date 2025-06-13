import { Project } from './project';
import { User } from './user';

export interface Comment {
  _id: string;
  user: User;
  text: string;
  createdAt: string;
}

export interface Task {
  _id: string;
  project: Project[]
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignees: User[];
  comments: Comment[];
}