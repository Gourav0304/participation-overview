import type { FormikHelpers } from 'formik';
import type { DetailsFormValues } from '@/constants/initialValues';
import { userApi } from '@/lib';
import { useRouter } from 'next/navigation';

export const handleDetailsFormSubmit = async (
  values: DetailsFormValues,
  formikHelpers: FormikHelpers<DetailsFormValues>,
  router: ReturnType<typeof useRouter>,
) => {
  const { resetForm, setSubmitting } = formikHelpers;

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
};
