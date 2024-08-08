import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "./auth-slice";
import wordsReducer from "./words-slice";

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    words: wordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
