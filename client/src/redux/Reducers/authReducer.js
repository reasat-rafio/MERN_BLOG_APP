import { REGISTER } from "../types";

export const authReducer = (state = {}, action) => {
   switch (action.type) {
      case REGISTER:
         return {
            ...action.payload,
         };

      default:
         return state;
   }
};
