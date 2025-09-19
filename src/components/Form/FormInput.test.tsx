import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { FormInput } from './FormInput';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';

describe('FormInput', () => {
  const validationSchema = toFormikValidationSchema(
    z.object({
      firstName: z.string().nonempty('First name is required'),
    }),
  );

  const initialValues = { firstName: '' };

  const renderInput = () =>
    render(
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={jest.fn()}
      >
        <Form>
          <FormInput id="firstName" name="firstName" placeholder="Enter first name" />
        </Form>
      </Formik>,
    );

  it('renders input with correct placeholder', () => {
    renderInput();
    const input = screen.getByPlaceholderText('Enter first name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'firstName');
  });

  it('shows validation error when blurred without value', async () => {
    renderInput();
    const input = screen.getByPlaceholderText('Enter first name');

    fireEvent.blur(input);

    await waitFor(() => {
      expect(
        screen.getByText(/Invalid input: expected string, received undefined/i),
      ).toBeInTheDocument();
    });
  });

  it('does not show error initially', () => {
    renderInput();
    expect(screen.queryByText(/first name is required/i)).not.toBeInTheDocument();
  });

  it('accepts input value', async () => {
    renderInput();
    const input = screen.getByPlaceholderText('Enter first name');

    fireEvent.change(input, { target: { value: 'John' } });
    expect((input as HTMLInputElement).value).toBe('John');
  });
});
