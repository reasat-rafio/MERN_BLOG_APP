import { LOGOUT, REGISTER, SIGNIN } from "../types";

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

      default:
         return state;
   }
};
