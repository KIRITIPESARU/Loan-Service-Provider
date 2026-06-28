// src\pages\kyc\KYCVerification.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateKYC, submitKYC } from '../../store/thunks/kycThunks';
import ProgressBar from '../../components/common/ProgressBar';
import DocumentUpload from '../../components/forms/DocumentUpload';
import Button from '../../components/common/Button';

const KYCVerification = () => {
  const dispatch = useDispatch();
  const { kycData, kycStatus, loading } = useSelector((state) => state.kyc);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    panNumber: '',
    aadhaarNumber: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    panCard: null,
    aadhaarFront: null,
    aadhaarBack: null,
    selfie: null
  });

  const steps = [
    { id: 1, name: 'Personal Details', completed: false },
    { id: 2, name: 'Document Upload', completed: false },
    { id: 3, name: 'Verification', completed: false }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (file, type) => {
    setFormData({ ...formData, [type]: file });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });
    await dispatch(submitKYC(formDataToSend));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN Number
                </label>
                <input type="text" name="panNumber" value={formData.panNumber}
                  onChange={handleInputChange} placeholder="ABCDE1234F"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
                <input type="text" name="aadhaarNumber" value={formData.aadhaarNumber}
                  onChange={handleInputChange} placeholder="1234 5678 9012"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input type="text" name="address" value={formData.address}
                  onChange={handleInputChange} placeholder="Street Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="123456"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <DocumentUpload title="PAN Card" description="Upload your PAN card (PDF or Image)" accept=".pdf,.jpg,.jpeg,.png"
              onUpload={(file) => handleFileUpload(file, 'panCard')}
            />
            <DocumentUpload title="Aadhaar Card - Front" description="Upload front side of Aadhaar card" accept=".jpg,.jpeg,.png"
              onUpload={(file) => handleFileUpload(file, 'aadhaarFront')}
            />
            <DocumentUpload title="Aadhaar Card - Back" description="Upload back side of Aadhaar card" accept=".jpg,.jpeg,.png"
              onUpload={(file) => handleFileUpload(file, 'aadhaarBack')}
            />
            <DocumentUpload title="Selfie with ID" description="Take a selfie holding your ID proof" accept="image/*" 
              onUpload={(file) => handleFileUpload(file, 'selfie')}
            />
          </div>
        );
      case 3:
        return (
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready for Verification</h3>
            <p className="text-gray-600 mb-4">Your documents will be verified by our team. This usually takes 24-48 hours.</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
              <p className="text-sm text-yellow-800">⚠️ Please ensure all documents are clear and valid. Incorrect or blurry documents may cause delays.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">KYC Verification</h2>
          <p className="text-blue-100 mt-1">Complete your verification to access loans</p>
        </div>
        <div className="px-8 py-6">
          <ProgressBar steps={steps} currentStep={currentStep} />
          <div className="mt-8">{renderStep()}</div>
          <div className="flex justify-between mt-8">
            <button onClick={handleBack} disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}>
              Back
            </button>
            {currentStep === steps.length ? (
              <Button onClick={handleSubmit} loading={loading}>Submit for Verification</Button>
            ) : (
              <button onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;