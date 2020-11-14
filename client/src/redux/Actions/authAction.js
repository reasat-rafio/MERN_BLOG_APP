import axios from "axios";
import { REGISTER, REGISTER_FAILED, SET_SNACKBAR } from "../types";
import { setSnackbar } from "./snackbarAction";

const url = "http://localhost:5000";

export const registerUser = (user) => async (dispatch) => {
   try {
      const { data } = await axios.post(`${url}/register`, user);
      if (data.success) {
         dispatch({
            type: REGISTER,
            payload: data,
         });
         dispatch(setSnackbar(true, "success", "Registration Succeed !"));
         setTimeout(() => {
            window.location = "/signin";
         }, 2000);
      } else {
         dispatch({
            type: REGISTER_FAILED,
            payload: data,
         });

         if (data.error.includes("E11000")) {
            dispatch(
               setSnackbar(true, "error", "This email is already registarted")
            );
         } else {
            dispatch(setSnackbar(true, "error", data.error));
         }
      }
   } catch (error) {
      console.log(error);
   }
};
