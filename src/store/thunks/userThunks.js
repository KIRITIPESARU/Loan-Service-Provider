// src/store/thunks/userThunks.js
import { updateProfileSuccess } from '../slices/authSlice';

export const updateProfile = (profileData) => async (dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch(updateProfileSuccess(profileData));
      resolve(profileData);
    }, 600);
  });
};
