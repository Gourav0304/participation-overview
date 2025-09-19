'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { createUserSchema } from '@/validation/user.schema';
import { userApi } from '@/services/userApi';
import { useRouter } from 'next/navigation';

export const DetailsForm = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', participationPercentage: '' }}
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
          console.error(err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form className="w-full sm:grid sm:grid-cols-4 sm:gap-4 gap-6 items-center sm:items-baseline sm:justify-center">
            <div className="flex flex-col col-span-1 w-full">
              <Field
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                className="p-3 rounded-sm border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 bg-gray-50"
              />
              <div className="min-h-4 mt-1">
                <ErrorMessage name="firstName" component="p" className="text-red-600 text-xs" />
              </div>
            </div>

            <div className="flex flex-col col-span-1 w-full">
              <Field
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                className="p-3 rounded-sm border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 bg-gray-50"
              />
              <div className="min-h-4 mt-1">
                <ErrorMessage name="lastName" component="p" className="text-red-600 text-xs" />
              </div>
            </div>

            <div className="flex flex-col col-span-1 w-full">
              <Field
                id="participationPercentage"
                type="number"
                name="participationPercentage"
                placeholder="ex: 10"
                className="p-3 rounded-sm border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 bg-gray-50"
              />
              <div className="min-h-4 mt-1">
                <ErrorMessage
                  name="participationPercentage"
                  component="p"
                  className="text-red-600 text-xs"
                />
              </div>
            </div>

            <div className="flex col-span-1 w-1/2 justify-center items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-13 px-6 py-3 rounded-md font-semibold text-white border-2 border-cyan-100 shadow-lg flex items-start justify-center gap-2 transition-transform duration-200 hover:scale-105 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed self-center"
              >
                {isSubmitting ? 'Sending...' : 'SEND'}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
