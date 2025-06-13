import { User } from './user';

export interface Project {
  _id: string;
  name: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'on_hold' | 'completed';
  progress: number;
  startDate: string;
  dueDate: string;
  teamMembers: User[];
  createdBy: User;
}