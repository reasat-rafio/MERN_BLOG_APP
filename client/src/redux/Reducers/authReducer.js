import {
   CLEAR_USER,
   LIKE_POST,
   LOGOUT,
   REGISTER,
   SIGNIN,
   DISLIKE_POST,
} from "../types";

export const authReducer = (state = {}, action) => {
   switch (action.type) {
      case SIGNIN:
         return {
            ...action.payload,
            isLogedIn: true,
         };
      case REGISTER:
         return {
            ...action.payload,
            isLogedIn: false,
         };

      case LOGOUT:
         return {
            user: "",
            isLogedIn: false,
         };

      case LIKE_POST:
         return {
            ...state,
            user: action.payload.user[0],
         };
      case DISLIKE_POST:
         return {
            ...state,
            user: action.payload.user[0],
         };

      case CLEAR_USER:
         return "";

      default:
         return state;
   }
};
