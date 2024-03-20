import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userReducer";
import persistStore from "redux-persist/es/persistStore";

const userPersistConfig = {
  key: "user",
  storage,
  blacklist: ["loginReqState"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  // users: userReducer
});

const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    return middlewares;
  },
});

export const persistor = persistStore(store);
export default store;
