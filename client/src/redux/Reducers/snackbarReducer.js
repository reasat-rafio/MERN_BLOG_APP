import { SET_SNACKBAR, CLEAR_SNACKBAR } from "../types";

const initialState = {
   snackbarOpen: false,
   snackbarType: "",
   snackbarMessage: "",
};

export const snackbarReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_SNACKBAR:
         const { snackbarOpen, snackbarType, snackbarMessage } = action.payload;
         return {
            ...state,
            snackbarOpen,
            snackbarType,
            snackbarMessage,
         };
      case CLEAR_SNACKBAR:
         return {
            ...state,
            snackbarOpen: false,
            snackbarType: "",
            snackbarMessage: "",
         };
      default:
         return state;
   }
};
