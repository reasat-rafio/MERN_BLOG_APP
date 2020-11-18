import { CLEAR_BLOG, FETCH_ALL_BLOGS } from "../types";

export const blogReducer = (state = {}, action) => {
   switch (action.type) {
      case FETCH_ALL_BLOGS:
         return {
            blogs: [...action.payload],
         };
      case CLEAR_BLOG:
         return "";
      default:
         return state;
   }
};
