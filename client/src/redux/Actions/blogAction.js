import { url } from "../../utils/url";
import axios from "axios";
import { FETCH_ALL_BLOGS, POST_A_BLOG } from "../types";
import { setSnackbar } from "./snackbarAction";
import { useSelector } from "react-redux";

export const fetchAllBlogs = () => async (dispatch) => {
   try {
      const { data } = await axios.get(`${url}/blogs`);
      if (data.success) {
         dispatch({
            type: FETCH_ALL_BLOGS,
            payload: data.data,
         });
      } else {
         dispatch(setSnackbar(true, "error", "Something went wrong 😟"));
      }
   } catch (error) {
      dispatch(setSnackbar(true, "error", `${error.message} 😟`));
   }
};

export const postBlog = (blog, user) => async (dispatch) => {
   try {
      const { data } = await axios.post(`${url}/blogs/post`, blog);

      if (data.success) {
         dispatch({
            type: POST_A_BLOG,
            payload: data.data,
         });

         dispatch(
            setSnackbar(true, "success", `${user} your post is saved! 😀`)
         );
      } else {
         dispatch(setSnackbar(true, "error", "Something went wrong  😟"));
      }
   } catch (error) {
      console.log(error);
      dispatch({
         type: "FAILED",
      });
      dispatch(setSnackbar(true, "error", `${error.message} 😟`));
   }
};
