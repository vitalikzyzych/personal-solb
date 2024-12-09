import { FormikHelpers, FormikProps, useFormik } from "formik";
import * as Yup from "yup";

export interface FormValues {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Props<T> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  enableReinitialize: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: T, submitProps: FormikHelpers<any>) => void;
}

interface UseFormReturn<T> {
  formik: FormikProps<T>;
}

const useForm = <T extends FormValues>({
  initialValues,
  validationSchema,
  enableReinitialize = false,
  onSubmit,
}: Props<T>): UseFormReturn<T> => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: enableReinitialize,
    onSubmit,
  });

  return { formik };
};

export default useForm;
