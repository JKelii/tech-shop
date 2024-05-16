import * as yup from "yup";

export const userSchemaLogin = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const userSchemaRegister = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(4).max(14).required("Password is required"),
});

export type LoginFormType = yup.InferType<typeof userSchemaLogin>;
