import axios from "axios";
import {
   LOGOUT,
   REGISTER,
   REGISTER_FAILED,
   SIGNIN,
   PROFILE_PICTURE_UPLOAD,
} from "../types";
import { setSnackbar } from "./snackbarAction";
import { url } from "../../utils/url";

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

export const loginUser = (user) => async (dispatch) => {
   try {
      const { data } = await axios.post(`${url}/login`, user);
      if (data.success) {
         dispatch({
            type: SIGNIN,
            payload: data,
         });

         dispatch(
            setSnackbar(true, "success", `Welcome back ${data.user.username} !`)
         );

         setTimeout(() => {
            window.location = "/home";
         }, 2000);
      } else {
         dispatch(setSnackbar(true, "error", data.error));
      }
   } catch (error) {}
};

export const logoutUser = () => async (dispatch) => {
   try {
      await axios.post(`${url}/logout`);
      dispatch({
         type: LOGOUT,
      });
      window.location = "/signin";
   } catch (error) {
      dispatch(setSnackbar(true, "error", "Something went wrong"));
   }
};

export const profilePictureUpload = (base64Image, user_id) => async (
   dispatch
) => {
   try {
      const { data } = await axios.post(`${url}/dp-upload/${user_id}`, {
         base64Image,
      });

      if (data.success) {
         console.log(data.data);
         dispatch({
            type: PROFILE_PICTURE_UPLOAD,
            payload: data.data,
         });
      }
   } catch (error) {
      console.log(error);
   }
};
