import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../config';

export const fetchRoomsThunk = createAsyncThunk(
  'rooms/fetchRooms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/rooms`);
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.error || 'Failed to fetch rooms');
      return data.data; // contains array of rooms
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoomsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRoomsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default roomSlice.reducer;
