import { apiClient } from '@/lib';
import type { User } from '@/constants';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const userApi = {
  getUsers: () => apiClient<User[]>(`${BASE_URL}/api/users`),
  createUser: (user: Omit<User, 'id' | 'createdAt'>) =>
    apiClient<User>(`${BASE_URL}/api/users`, { method: 'POST', body: user }),
};
