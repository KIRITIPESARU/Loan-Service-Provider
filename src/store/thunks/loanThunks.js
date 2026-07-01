// src/store/thunks/loanThunks.js

export const applyForLoan = (loanData) => async (dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: loanData });
    }, 1000);
  });
};