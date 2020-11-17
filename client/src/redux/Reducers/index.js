import { authReducer } from "./authReducer";
import { blogReducer } from "./blogReducer";
import { snackbarReducer } from "./snackbarReducer";

const { combineReducers } = require("redux");

export const reducers = combineReducers({
   snackbar: snackbarReducer,
   auth: authReducer,
   blog: blogReducer,
});
