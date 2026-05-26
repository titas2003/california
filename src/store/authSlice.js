import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../config';

export const loginCustomerThunk = createAsyncThunk(
  'auth/loginCustomer',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message || 'Login failed');
      return data; // contains token and user profile
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerCustomerThunk = createAsyncThunk(
  'auth/registerCustomer',
  async (details, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.error || 'Registration failed');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isAuthenticated: localStorage.getItem('cust_token') ? true : false,
  user: localStorage.getItem('cust_user') ? JSON.parse(localStorage.getItem('cust_user')) : null,
  token: localStorage.getItem('cust_token') || null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('cust_token');
      localStorage.removeItem('cust_user');
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('cust_token', action.payload.token);
        localStorage.setItem('cust_user', JSON.stringify(action.payload.user));
      })
      .addCase(loginCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('cust_token', action.payload.token);
        localStorage.setItem('cust_user', JSON.stringify(action.payload.user));
      })
      .addCase(registerCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
