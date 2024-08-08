import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthorizationState {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthorizationState = {
  token: localStorage.getItem("userToken") || null,
  isLoggedIn: !!localStorage.getItem("userToken"),
};

const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("userToken", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("userToken");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
export type { AuthorizationState };
