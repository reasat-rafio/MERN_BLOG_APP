import { url } from "../../utils/url";
import axios from "axios";
import {
   DELETE_A_BLOG,
   FETCH_ALL_BLOGS,
   FETCH_LOGGEDIN_USER_BLOG,
   POST_A_BLOG,
   FETCH_CLICKED_BLOGS,
   FETCH_CLICKED_BLOGS_FAILED,
   USER_POST_NULL,
   EDIT_BLOG,
   LIKE_POST,
   DISLIKE_POST,
   FETCH_LIKED_BLOGS,
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
      const { data } = await axios.delete(`${url}/blogs/delete/${_id}`);

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

export const fetchClickedBLog = (_id) => async (dispatch) => {
   try {
      const { data } = await axios.get(`${url}/blogs/u/${_id}`);

      if (data.success) {
         dispatch({
            type: FETCH_CLICKED_BLOGS,
            payload: data.data,
         });
      }
      if (!data.success) {
         dispatch({
            type: FETCH_CLICKED_BLOGS_FAILED,
         });
      }
   } catch (error) {
      console.log(error);
   }
};

export const editBlog = (blog, id) => async (dispatch) => {
   try {
      const { data } = await axios.patch(`${url}/blogs/edit/${id}`, blog);
      if (data.success) {
         console.log(data.data);
         dispatch({
            type: EDIT_BLOG,
            payload: data.data,
         });
         dispatch(setSnackbar(true, "success", "Your post is updated 😀"));
      }
   } catch (error) {
      console.log(error);
   }
};

export const likePost = (user_id, blogId) => async (dispatch) => {
   try {
      const { data } = await axios.post(`${url}/like/${blogId}`, { user_id });
      const {
         data: { blog, user },
      } = data;
      dispatch({
         type: LIKE_POST,
         payload: { blog, user },
      });
      console.log(blog);
      console.log(user);
   } catch (error) {
      dispatch(setSnackbar(true, "error", `${error.message} ☹`));
      console.log(error);
   }
};

export const dislikePost = (user_id, blogId) => async (dispatch) => {
   try {
      const { data } = await axios.post(`${url}/dislike/${blogId}`, {
         user_id,
      });
      const {
         data: { blog, user, likedBlog },
      } = data;
      console.log(likedBlog);
      dispatch({
         type: DISLIKE_POST,
         payload: { blog, user, likedBlog },
      });
   } catch (error) {
      dispatch(setSnackbar(true, "error", `${error.message} ☹`));
      console.log(error);
   }
};

export const fetchLikedBlogs = (id) => async (dispatch) => {
   try {
      const { data } = await axios.get(`${url}/blogs/${id}/likedpost`);
      if (data.success) {
         dispatch({
            type: FETCH_LIKED_BLOGS,
            payload: data.data[0].likedPost,
         });
      }
   } catch (error) {
      console.log(error);
   }
};
