import { userApi } from './userApi';
import { apiClient } from '@/lib';
import type { User } from '@/constants';

jest.mock('@/lib', () => ({
  apiClient: jest.fn(),
}));

const mockApiClient = apiClient as jest.MockedFunction<typeof apiClient>;

describe('userApi', () => {
  it('getUsers calls apiClient with correct URL', async () => {
    const mockUsers: User[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', participationPercentage: 50, createdAt: '' },
    ];

    mockApiClient.mockResolvedValueOnce(mockUsers);

    const result = await userApi.getUsers();

    expect(mockApiClient).toHaveBeenCalledWith(expect.stringContaining('/api/users'));
    expect(result).toEqual(mockUsers);
  });

  it('createUser calls apiClient with correct URL and POST method', async () => {
    const newUser = { firstName: 'Jane', lastName: 'Smith', participationPercentage: 30 };

    const mockUser: User = { id: 2, createdAt: '', ...newUser };

    mockApiClient.mockResolvedValueOnce(mockUser);

    const result = await userApi.createUser(newUser);

    expect(mockApiClient).toHaveBeenCalledWith(expect.stringContaining('/api/users'), {
      method: 'POST',
      body: newUser,
    });
    expect(result).toEqual(mockUser);
  });
});
