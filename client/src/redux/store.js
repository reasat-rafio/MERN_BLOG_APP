import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "./Reducers";
import thunk from "redux-thunk";

export const store = createStore(
   reducers,
   composeWithDevTools(applyMiddleware(thunk))
);
