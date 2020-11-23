import { url } from "../../utils/url";
import axios from "axios";
import {
   DELETE_A_BLOG,
   FETCH_ALL_BLOGS,
   FETCH_LOGGEDIN_USER_BLOG,
   POST_A_BLOG,
   USER_POST_NULL,
} from "../types";
import { setSnackbar } from "./snackbarAction";

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

export const fetchLoggedInUserBlogs = (id) => async (dispathc) => {
   try {
      const { data } = await axios.get(`${url}/blogs/${id}`);
      if (data.message) {
         return dispathc({
            type: USER_POST_NULL,
         });
      }
      if (data.data) {
         return dispathc({
            type: FETCH_LOGGEDIN_USER_BLOG,
            payload: data.data,
         });
      }
   } catch (error) {
      console.log(error);
   }
};

export const deleteBlog = (_id, userId) => async (dispatch) => {
   try {
      const { data } = await axios.delete(`${url}/blogs/delete/${_id}`, {
         data: { userId },
      });

      if (data.success) {
         dispatch({
            type: DELETE_A_BLOG,
            payload: data.data,
         });
         dispatch(setSnackbar(true, "success", `post Deleted! 🚮`));
      }
      if (!data.success) {
         dispatch(setSnackbar(true, "error", `Something went wrong`));
      }
   } catch (error) {
      console.log(error);
   }
};
