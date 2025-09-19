import { handleDetailsFormSubmit } from './formHandlers';
import { userApi } from '@/lib/userApi';
import type { DetailsFormValues } from '@/constants/initialValues';
import type { FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

jest.mock('@/lib/userApi', () => ({
  userApi: {
    createUser: jest.fn(),
  },
}));

describe('handleDetailsFormSubmit', () => {
  const mockResetForm = jest.fn();
  const mockSetSubmitting = jest.fn();
  const mockRouter = { refresh: jest.fn() } as unknown as ReturnType<typeof useRouter>;

  const formikHelpers = {
    resetForm: mockResetForm,
    setSubmitting: mockSetSubmitting,
  } as unknown as FormikHelpers<DetailsFormValues>;

  const values: DetailsFormValues = {
    firstName: 'John',
    lastName: 'Doe',
    participationPercentage: '50',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls userApi.createUser with correct values and resets form on success', async () => {
    (userApi.createUser as jest.MockedFunction<typeof userApi.createUser>).mockResolvedValue({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      participationPercentage: 50,
      createdAt: '',
    });

    await handleDetailsFormSubmit(values, formikHelpers, mockRouter);

    expect(userApi.createUser).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      participationPercentage: 50,
    });
    expect(mockResetForm).toHaveBeenCalled();
    expect(mockRouter.refresh).toHaveBeenCalled();
    expect(mockSetSubmitting).toHaveBeenCalledWith(false);
  });

  it('handles API errors and still sets submitting to false', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (userApi.createUser as jest.MockedFunction<typeof userApi.createUser>).mockRejectedValue(
      new Error('API Error'),
    );

    await handleDetailsFormSubmit(values, formikHelpers, mockRouter);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating user:', expect.any(Error));
    expect(mockSetSubmitting).toHaveBeenCalledWith(false);

    consoleErrorSpy.mockRestore();
  });
});
