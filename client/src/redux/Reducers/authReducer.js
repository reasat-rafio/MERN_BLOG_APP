import { REGISTER, SIGNIN } from "../types";

export const authReducer = (state = {}, action) => {
   switch (action.type) {
      case SIGNIN:
         return {
            ...action.payload,
         };
      case REGISTER:
         return {
            ...action.payload,
         };

      default:
         return state;
   }
};
