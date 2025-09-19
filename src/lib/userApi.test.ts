import { userApi } from './userApi';
import { apiClient } from '../lib/apiClient';
import type { User } from '@/constants';

jest.mock('../lib/apiClient', () => ({
  apiClient: jest.fn(),
}));

describe('userApi', () => {
  const mockApiClient = apiClient as jest.MockedFunction<typeof apiClient>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getUsers calls apiClient with correct URL', async () => {
    const mockUsers: User[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', participationPercentage: 50, createdAt: '' },
    ];
    mockApiClient.mockResolvedValueOnce(mockUsers);

    const result = await userApi.getUsers();

    expect(mockApiClient).toHaveBeenCalledTimes(1);
    expect(mockApiClient).toHaveBeenCalledWith(expect.stringContaining('/api/users'));
    expect(result).toEqual(mockUsers);
  });

  it('createUser calls apiClient with correct URL and POST method', async () => {
    const newUser = { firstName: 'Jane', lastName: 'Smith', participationPercentage: 30 };
    const createdUser: User = { ...newUser, id: 2, createdAt: '' };

    mockApiClient.mockResolvedValueOnce(createdUser);

    const result = await userApi.createUser(newUser);

    // Only check the method and body — headers are added inside apiClient
    expect(mockApiClient).toHaveBeenCalledWith(
      expect.stringContaining('/api/users'),
      expect.objectContaining({
        method: 'POST',
        body: newUser,
      }),
    );
    expect(result).toEqual(createdUser);
  });
});
