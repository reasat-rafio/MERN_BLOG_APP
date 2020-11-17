import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "./Reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
   key: "root",
   storage,
   whitelist: ["auth", "blog"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
   persistedReducer,
   composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
