// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  isAuth: boolean;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  error: null,
  isLoading: false,
};

// ЗАПОМНИ: Логин и пароль только admin
const VALID_LOGIN = 'admin';
const VALID_PASSWORD = 'admin';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { login: string; password: string }, { rejectWithValue }) => {
    // Простая проверка
    if (credentials.login === VALID_LOGIN && credentials.password === VALID_PASSWORD) {
      return { isAuth: true };
    } else {
      return rejectWithValue('Неверный логин или пароль');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Неверный логин или пароль';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;