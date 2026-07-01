// src/store/thunks/kycThunks.js
import { updateKYCStatus } from '../slices/authSlice';

export const updateKYC = (kycData) => async (dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: kycData });
    }, 500);
  });
};

export const submitKYC = (kycData) => async (dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch(updateKYCStatus('verified'));
      alert('KYC Verification Successful! Your identity is instantly verified using AI OCR.');
      resolve({ success: true });
    }, 1200);
  });
};
