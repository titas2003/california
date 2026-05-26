import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, getHeaders } from '../config';

export const fetchCustomerBookingsThunk = createAsyncThunk(
  'bookings/fetchCustomerBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        headers: getHeaders()
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.error || 'Failed to fetch bookings');
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBookingThunk = createAsyncThunk(
  'bookings/createBooking',
  async (bookingDetails, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(bookingDetails)
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message || 'Booking failed');
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelBookingThunk = createAsyncThunk(
  'bookings/cancelBooking',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${id}/cancel`, {
        method: 'PUT',
        headers: getHeaders()
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message || 'Cancellation failed');
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    // Backwards-compatible local actions for UI state updating
    bookRoom: (state, action) => {
      const { roomId, roomNumber, roomType, checkIn, checkOut, totalAmount, pricePerNight } = action.payload;
      const tax = totalAmount * 0.12;
      state.list.push({
        id: Math.random().toString(36).substr(2, 9),
        roomId,
        roomNumber,
        roomType,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        totalAmount,
        tax,
        pricePerNight,
        bookingStatus: 'Confirmed',
        paymentStatus: 'Unpaid',
        paymentMethod: 'Pending',
        transportRequested: false,
        transportDetails: null
      });
    },
    settleInvoice: (state, action) => {
      const { id, method } = action.payload;
      const booking = state.list.find(b => (b._id || b.id) === id);
      if (booking) {
        booking.paymentStatus = 'Paid';
        booking.paymentMethod = method;
      }
    },
    requestTransport: (state, action) => {
      const { id, vehicleType, notes } = action.payload;
      const booking = state.list.find(b => (b._id || b.id) === id);
      if (booking) {
        booking.transportRequested = true;
        booking.transportDetails = { vehicleType, notes, status: 'Assigned (Beverly Shuttle)' };
      }
    },
    cancelBooking: (state, action) => {
      const booking = state.list.find(b => (b._id || b.id) === action.payload);
      if (booking) {
        booking.bookingStatus = 'Cancelled';
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch bookings
      .addCase(fetchCustomerBookingsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerBookingsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCustomerBookingsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create booking
      .addCase(createBookingThunk.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Cancel booking
      .addCase(cancelBookingThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  }
});

export const { bookRoom, settleInvoice, requestTransport, cancelBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
