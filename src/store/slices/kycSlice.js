// src/store/slices/kycSlice.js
import { createSlice } from '@reduxjs/toolkit';

const kycSlice = createSlice({
  name: 'kyc',
  initialState: {
    kycData: null,
    kycStatus: 'not_started',
    loading: false,
    error: null
  },
  reducers: {
    kycStart: (state) => {
      state.loading = true;
    },
    kycSuccess: (state, action) => {
      state.loading = false;
      state.kycData = action.payload;
      state.kycStatus = 'verified';
    },
    kycFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { kycStart, kycSuccess, kycFailure } = kycSlice.actions;
export default kycSlice.reducer;
