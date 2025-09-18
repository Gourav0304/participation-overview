import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  participationPercentage: z
    .number()
    .min(0, 'Participation must be >= 0')
    .max(100, 'Participation must be <= 100'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
