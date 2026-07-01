// src/utils/calculators.js

/**
 * Calculates the Equated Monthly Installment (EMI) for a loan.
 * Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export const calculateEMI = (amount, interestRate, tenureMonths) => {
  const P = parseFloat(amount);
  const annualRate = parseFloat(interestRate);
  const n = parseInt(tenureMonths);

  if (isNaN(P) || isNaN(annualRate) || isNaN(n) || P <= 0 || annualRate <= 0 || n <= 0) {
    return 0;
  }

  const r = annualRate / 12 / 100; // Monthly interest rate
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return isFinite(emi) ? emi : 0;
};

/**
 * Determines loan eligibility based on user profile factors and requested amount.
 */
export const calculateEligibility = (user, amount) => {
  if (!user) {
    return {
      eligible: false,
      maxAmount: 0,
      message: 'Please complete your user login to check eligibility.'
    };
  }

  const score = user.creditScore || 650;
  let maxAmount = 100000;

  if (score >= 780) {
    maxAmount = 5000000; // 50 Lakhs
  } else if (score >= 720) {
    maxAmount = 2500000; // 25 Lakhs
  } else if (score >= 650) {
    maxAmount = 1000000; // 10 Lakhs
  } else if (score >= 600) {
    maxAmount = 300000;  // 3 Lakhs
  } else {
    maxAmount = 50000;   // 50k
  }

  const reqAmount = parseFloat(amount || 0);

  if (reqAmount <= 0) {
    return {
      eligible: true,
      maxAmount,
      message: `Based on your excellent credit score of ${score}, you are pre-approved for up to ₹${maxAmount.toLocaleString()}!`
    };
  }

  if (reqAmount <= maxAmount) {
    return {
      eligible: true,
      maxAmount,
      message: `Excellent! You meet all financial parameters for a ₹${reqAmount.toLocaleString()} loan.`
    };
  } else {
    return {
      eligible: false,
      maxAmount,
      message: `Requested loan exceeds your maximum limit of ₹${maxAmount.toLocaleString()} based on your CIBIL score.`
    };
  }
};

/**
 * Calculates the total interest paid over the lifecycle of a loan.
 */
export const calculateTotalInterest = (amount, interestRate, tenureMonths) => {
  const emi = calculateEMI(amount, interestRate, tenureMonths);
  if (emi <= 0) return 0;
  const totalPaid = emi * parseInt(tenureMonths);
  const principal = parseFloat(amount);
  return Math.max(0, totalPaid - principal);
};
