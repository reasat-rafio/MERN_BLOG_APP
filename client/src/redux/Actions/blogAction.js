import { url } from "../../utils/url";
import axios from "axios";
import { FETCH_ALL_BLOGS } from "../types";
import { setSnackbar } from "./snackbarAction";

export const fetchAllBlogs = () => async (dispatch) => {
   try {
      const { data } = await axios.get(`${url}/blogs`);
      if (data.success) {
         dispatch({
            type: FETCH_ALL_BLOGS,
            payload: data.data,
         });
         console.log(data.data);
      } else {
         dispatch(setSnackbar(true, "error", "Something went wrong 😟"));
      }
   } catch (error) {
      console.log(error);
   }
};
