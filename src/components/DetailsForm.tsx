'use client';

import { Formik, Form } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { createUserSchema } from '@/validation/user.schema';
import { userApi } from '@/lib/userApi';
import { useRouter } from 'next/navigation';
import { initialValues } from '@/constants';
import { FormInput } from './FormInput';

export const DetailsForm = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(createUserSchema)}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        try {
          await userApi.createUser({
            ...values,
            participationPercentage: Number(values.participationPercentage),
          });
          resetForm();
          router.refresh();
        } catch (err) {
          console.error('Error creating user:', err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="w-full sm:grid sm:grid-cols-4 sm:gap-4 gap-6 items-center justify-center">
          <FormInput id="firstName" name="firstName" placeholder="Enter first name" />
          <FormInput id="lastName" name="lastName" placeholder="Enter last name" />
          <FormInput
            id="participationPercentage"
            name="participationPercentage"
            type="number"
            placeholder="ex: 10"
          />

          <div className="col-span-1 flex w-full h-full items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 h-12 px-6 rounded-md font-semibold text-white bg-cyan-600 border border-cyan-100 shadow-lg transition-transform duration-200 hover:scale-105 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'SEND'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
