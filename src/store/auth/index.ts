import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loginCheck } from 'service/AuthService';

interface AuthState {
  isLoggedIn: boolean | null;
  userDetails: unknown;
}

const initialState: AuthState = {
  isLoggedIn: Boolean(loginCheck()),
  userDetails: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetails: (state, { payload }: PayloadAction<string | null>) => ({
      ...state,
      userDetails: payload,
    }),
    setIsLoggedIn: (state, { payload }: PayloadAction<boolean | null>) => ({
      ...state,
      isLoggedIn: payload,
    }),
  },
});

export const { setUserDetails } = authSlice.actions;

export default authSlice.reducer;
