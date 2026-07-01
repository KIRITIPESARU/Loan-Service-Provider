// src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialUser = {
  fullName: 'Pesaru Kireeti',
  email: 'pesaruk13@gmail.com',
  phone: '+91 98765 43210',
  address: '123, Tech Park Lane, HITEC City',
  city: 'Hyderabad',
  state: 'Telangana',
  pincode: '500081',
  role: 'admin',
  kycStatus: 'verified', // verified, pending, rejected, not_started
  creditScore: 785,
  income: 1200000,
  avatar: 'PK'
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: true,
    user: initialUser,
    loading: false,
    error: null
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = { ...initialUser, ...action.payload };
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
    updateProfileSuccess: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateKYCStatus: (state, action) => {
      if (state.user) {
        state.user.kycStatus = action.payload;
      }
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfileSuccess,
  updateKYCStatus
} = authSlice.actions;

export default authSlice.reducer;
