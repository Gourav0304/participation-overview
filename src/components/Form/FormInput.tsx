import { Field, ErrorMessage } from 'formik';
import type { InputProps } from '@/constants';

export const FormInput = ({ id, name, placeholder, type = 'text' }: InputProps) => (
  <div className="flex flex-col justify-center col-span-1 w-full">
    <Field
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className="p-3 mt-5 rounded-sm border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 bg-gray-50"
      aria-describedby={`${id}-error`}
    />
    <div className="min-h-4 mt-1">
      <ErrorMessage name={name} component="p" id={`${id}-error`} className="text-red-600 text-xs" />
    </div>
  </div>
);
