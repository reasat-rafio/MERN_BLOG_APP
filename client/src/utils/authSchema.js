import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const signupSchema = yup.object().shape({
   password: yup
      .string()
      .min(4, "Password must be longer than 4 cheracter")
      .required("This field is required"),
   email: yup
      .string()
      .email("Please enter a correct email")
      .required("Email is required"),
   firstName: yup.string().max(20).required("This field is required"),
   lastName: yup.string().max(20).required("This field is required"),
});

export const signinSchema = yup.object().shape({
   email: yup
      .string()
      .email("Please enter a correct email")
      .required("Email is required"),
   password: yup
      .string()
      .min(4, "Password must be longer than 4 cheracter")
      .required("This field is required"),
});
