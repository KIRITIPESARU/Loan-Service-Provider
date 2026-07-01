// src\pages\agreement\LoanAgreement.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/common/Button';
import SignaturePad from '../../components/common/SignaturePad';

const LoanAgreement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreement, setAgreement] = useState(null);
  const [signature, setSignature] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const { get, post } = useApi();

  useEffect(() => {
    fetchAgreement();
  }, [id]);

  const fetchAgreement = async () => {
    try {
      const data = await get(`/loans/${id}/agreement`);
      setAgreement(data);
    } catch (error) {
      console.error('Failed to fetch agreement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSign = async () => {
    if (!agreed) {
      alert('Please accept the terms and conditions');
      return;
    }
    setShowSignaturePad(true);
  };

  const handleSignatureSave = async (signatureData) => {
    setSigning(true);
    try {
      await post(`/loans/${id}/sign`, { signature: signatureData });
      alert('Agreement signed successfully!');
      navigate(`/loans/${id}`);
    } catch (error) {
      console.error('Failed to sign agreement:', error);
      alert('Failed to sign agreement. Please try again.');
    } finally {
      setSigning(false);
      setShowSignaturePad(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Loan Agreement</h2>
          <p className="text-blue-100 mt-1">
            Please review and sign the loan agreement
          </p>
        </div>

        <div className="p-8">
          {/* Agreement Document */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 max-h-96 overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-bold text-gray-800 mb-4">LOAN AGREEMENT</h3>
              <p className="text-gray-700 mb-4">
                This Loan Agreement (the "Agreement") is made and entered into as of {new Date().toLocaleDateString()}
                by and between LSP Platform ("Lender") and {agreement?.borrowerName} ("Borrower").
              </p>

              <h4 className="font-semibold text-gray-800 mt-4 mb-2">1. LOAN AMOUNT AND TERMS</h4>
              <p className="text-gray-700 mb-2">
                Lender agrees to lend to Borrower, and Borrower agrees to borrow from Lender,
                a principal amount of ₹{agreement?.amount?.toLocaleString()} (the "Loan").
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-700">
                <li>Interest Rate: {agreement?.interestRate}% per annum</li>
                <li>Loan Tenure: {agreement?.tenure} months</li>
                <li>EMI Amount: ₹{Math.round(agreement?.emi).toLocaleString()}</li>
                <li>First Payment Due: {new Date(agreement?.firstDueDate).toLocaleDateString()}</li>
              </ul>

              <h4 className="font-semibold text-gray-800 mt-4 mb-2">2. REPAYMENT</h4>
              <p className="text-gray-700 mb-2">
                Borrower agrees to repay the Loan in {agreement?.tenure} equal monthly installments.
                Each installment shall be due on the same day of each month.
              </p>

              <h4 className="font-semibold text-gray-800 mt-4 mb-2">3. PREPAYMENT</h4>
              <p className="text-gray-700 mb-2">
                Borrower may prepay the Loan in whole or in part at any time after 6 months
                from the date of first disbursement without any prepayment penalty.
              </p>

              <h4 className="font-semibold text-gray-800 mt-4 mb-2">4. DEFAULT</h4>
              <p className="text-gray-700 mb-2">
                In the event of default, Lender shall have the right to demand immediate
                repayment of the entire outstanding principal amount along with accrued interest.
                A late fee of 2% per month shall be charged on overdue amounts.
              </p>

              <h4 className="font-semibold text-gray-800 mt-4 mb-2">5. GOVERNING LAW</h4>
              <p className="text-gray-700 mb-2">
                This Agreement shall be governed by and construed in accordance with the laws of India.
                Any disputes arising under this Agreement shall be subject to the exclusive jurisdiction
                of courts in Mumbai, Maharashtra.
              </p>
            </div>
          </div>

          {/* Acceptance Checkbox */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 mr-3"
              />
              <span className="text-sm text-gray-700">
                I hereby confirm that I have read, understood, and agree to all the terms and conditions
                of this Loan Agreement. I acknowledge that this is a legally binding document and I am
                entering into this agreement voluntarily.
              </span>
            </label>
          </div>

          {/* Signature Section */}
          {agreement?.status === 'unsigned' && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Digital Signature</h3>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                {!showSignaturePad ? (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Please sign below to complete the agreement
                    </p>
                    <Button onClick={handleSign} disabled={!agreed}>
                      Sign Agreement
                    </Button>
                  </div>
                ) : (
                  <SignaturePad onSave={handleSignatureSave} onCancel={() => setShowSignaturePad(false)} />
                )}
              </div>
            </div>
          )}

          {/* Signed Status */}
          {agreement?.status === 'signed' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-green-800">Agreement Signed</p>
                  <p className="text-xs text-green-700 mt-1">
                    Signed on {new Date(agreement?.signedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Download Button */}
          <div className="mt-6 flex justify-end">
            <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Agreement (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanAgreement;