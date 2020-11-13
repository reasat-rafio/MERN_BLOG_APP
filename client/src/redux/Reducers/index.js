import { authReducer } from "./authReducer";

const { combineReducers } = require("redux");

export const reducers = combineReducers({
   auth: authReducer,
});
