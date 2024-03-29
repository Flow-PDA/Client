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
import partyReducer from "./reducers/partyReducer";

const userPersistConfig = {
  key: "user",
  storage,
  blacklist: ["loginReqState"],
};
const partyPersistConfig = {
  key: "party",
  storage,
  blacklist: ["loginReqState"],
};
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  // users: userReducer
  party: persistReducer(partyPersistConfig, partyReducer),
});
// const rootReducer = persistReducer(
//   userPersistConfig,
//   combineReducers({
//     user: userReducer,
//     party: partyReducer,
//   })
// );
// const rootReducer = persistReducer(
//   rootPersistConfig,
//   combineReducers({
//     user: UserReducer,
//     search: SearchReducer,
//   })
// );
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
