import * as yup from "yup";

export const userSchemaLogin = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const userSchemaRegister = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(4).max(64).required("Password is required"),
});

export type LoginFormType = yup.InferType<typeof userSchemaLogin>;

export const paymentCardSchema = yup.object().shape({
  name: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  zip: yup.string().required("Zip is required"),
  card: yup.string().min(16).max(16).required("Insert card number"),
  cvc: yup
    .string()
    .min(3)
    .max(3)
    .required("Insert cvc number from back of the card"),
});

export const userSchemaNewsletter = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

export type PaymentFormType = yup.InferType<typeof paymentCardSchema>;
