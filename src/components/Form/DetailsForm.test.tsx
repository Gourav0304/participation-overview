import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DetailsForm } from '@/components/Form/DetailsForm';
import { handleDetailsFormSubmit } from '@/lib/formHandlers';

const mockRefresh = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));

jest.mock('@/lib/formHandlers', () => ({
  handleDetailsFormSubmit: jest.fn(),
}));

describe('DetailsForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and the submit button', () => {
    render(<DetailsForm />);

    expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ex: 10')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty and blurred', async () => {
    render(<DetailsForm />);

    const firstNameInput = screen.getByPlaceholderText('Enter first name');
    fireEvent.blur(firstNameInput);

    await waitFor(() => {
      expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    });
  });

  it('calls handleDetailsFormSubmit on submit', async () => {
    render(<DetailsForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter first name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('ex: 10'), { target: { value: '50' } });

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(handleDetailsFormSubmit).toHaveBeenCalledTimes(1);
      expect(handleDetailsFormSubmit).toHaveBeenCalledWith(
        { firstName: 'John', lastName: 'Doe', participationPercentage: 50 },
        expect.any(Object),
        { refresh: mockRefresh },
      );
    });
  });

  it('disables submit button while submitting', async () => {
    (handleDetailsFormSubmit as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<DetailsForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter first name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('ex: 10'), { target: { value: '50' } });

    const submitButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
