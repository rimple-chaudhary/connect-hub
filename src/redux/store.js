import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import PostSliceReducer from "./slice/PostSlice";
import userFriendSlicereducer from "./slice/FriendList";
import LikesSlicereducer from "./slice/likePost"

import AuthSliceReducer from "./slice/AuthSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  AuthSlice: AuthSliceReducer,
  PostSlice: PostSliceReducer,
  userFriend: userFriendSlicereducer,
  LikesSlice: LikesSlicereducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { persistor, store };
