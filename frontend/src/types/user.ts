export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
  avatar: string;
  createdAt: string;
}