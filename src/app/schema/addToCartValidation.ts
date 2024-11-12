import * as yup from "yup";

export const addToCartSchema = yup.object().shape({
  RadioGroup: yup.string().required("Please select size"),
});
