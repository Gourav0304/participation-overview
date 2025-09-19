import { UserService } from './user.service';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('createUser calls prisma.user.create with correct data', async () => {
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      participationPercentage: 50,
    });

    const result = await UserService.createUser('John', 'Doe', 50);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { firstName: 'John', lastName: 'Doe', participationPercentage: 50 },
    });
    expect(result.firstName).toBe('John');
  });

  it('getUsers calls prisma.user.findMany', async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([{ id: 1, firstName: 'John' }]);

    const result = await UserService.getUsers();

    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(result[0].firstName).toBe('John');
  });

  it('getUserById calls prisma.user.findUnique with correct id', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, firstName: 'John' });

    const result = await UserService.getUserById(1);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result?.id).toBe(1);
  });
});
