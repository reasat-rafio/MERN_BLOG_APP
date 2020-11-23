import {
   CLEAR_BLOG,
   DELETE_A_BLOG,
   FETCH_ALL_BLOGS,
   FETCH_LOGGEDIN_USER_BLOG,
   POST_A_BLOG,
   USER_POST_NULL,
} from "../types";

const initalState = {
   blogs: [],
   userProfileBlogs: "",
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
