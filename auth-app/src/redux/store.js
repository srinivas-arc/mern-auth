import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({ user: userReducer });
const persistConfigure = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfigure, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
