import {
   CLEAR_BLOG,
   DELETE_A_BLOG,
   FETCH_ALL_BLOGS,
   FETCH_LOGGEDIN_USER_BLOG,
   POST_A_BLOG,
   FETCH_CLICKED_BLOGS,
   USER_POST_NULL,
   EDIT_BLOG,
   LIKE_POST,
   DISLIKE_POST,
} from "../types";

const initalState = {
   blogs: [],
   userProfileBlogs: "",
   currentBlog: [],
};

export const blogReducer = (state = initalState, action) => {
   switch (action.type) {
      case FETCH_ALL_BLOGS:
         return {
            ...state,
            blogs: [...action.payload],
         };

      case POST_A_BLOG:
         return {
            ...state,
            blogs: [...action.payload],
         };

      case FETCH_LOGGEDIN_USER_BLOG:
         return {
            ...state,
            userProfileBlogs: [...action.payload],
         };
      case USER_POST_NULL:
         return {
            ...state,
            userProfileBlogs: null,
         };
      case FETCH_CLICKED_BLOGS:
         return {
            ...state,
            currentBlog: [...action.payload],
         };

      case EDIT_BLOG:
         return {
            ...state,
            blogs: [...action.payload.allBlogs],
            userProfileBlogs: [...action.payload.userBlogs],
         };

      case LIKE_POST:
         return {
            ...state,
            blogs: [...action.payload.blog],
         };

      case DISLIKE_POST:
         return {
            ...state,
            blogs: [...action.payload.blog],
         };

      case DELETE_A_BLOG:
         return {
            ...state,
            blogs: [...action.payload],
         };
      case CLEAR_BLOG:
         return "";
      default:
         return state;
   }
};
