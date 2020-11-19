import { CLEAR_BLOG, FETCH_ALL_BLOGS, POST_A_BLOG } from "../types";

const initalState = {
   blogs: [],
   postedBlog: [],
};

export const blogReducer = (state = initalState, action) => {
   switch (action.type) {
      case FETCH_ALL_BLOGS:
         return {
            blogs: [...action.payload],
         };

      case POST_A_BLOG:
         console.log(action.payload);
         // console.log(...action.payload);

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
