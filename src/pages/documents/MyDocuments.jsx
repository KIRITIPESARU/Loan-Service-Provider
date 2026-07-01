// src\pages\documents\MyDocuments.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import DocumentUpload from '../../components/forms/DocumentUpload';
import Button from '../../components/common/Button';

const MyDocuments = () => {
  const [documents, setDocuments] = useState({
    kyc: [],
    loan: [],
    others: []
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedType, setSelectedType] = useState('kyc');
  const { get, post } = useApi();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const data = await get('/user/documents');
      setDocuments(data);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file, category) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('document', file);
    formData.append('category', category);
    
    try {
      await post('/user/documents/upload', formData);
      fetchDocuments();
      setShowUpload(false);
    } catch (error) {
      console.error('Failed to upload document:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (docId, fileName) => {
    try {
      const response = await get(`/user/documents/${docId}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
    } catch (error) {
      console.error('Failed to download document:', error);
    }
  };

  const handleDelete = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await post(`/user/documents/${docId}/delete`);
        fetchDocuments();
      } catch (error) {
        console.error('Failed to delete document:', error);
      }
    }
  };

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('doc')) return '📝';
    return '📁';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">My Documents</h2>
              <p className="text-blue-100 mt-1">Manage your uploaded documents</p>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50"
            >
              + Upload Document
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* KYC Documents */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">KYC Documents</h3>
            {documents.kyc.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No KYC documents uploaded</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.kyc.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getFileIcon(doc.fileType)}</span>
                        <div>
                          <p className="font-medium text-gray-800">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        doc.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.verified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleDownload(doc.id, doc.name)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Loan Documents */}
          {documents.loan.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.loan.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getFileIcon(doc.fileType)}</span>
                        <div>
                          <p className="font-medium text-gray-800">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.loanId}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleDownload(doc.id, doc.name)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Upload Document</h3>
              <button onClick={() => setShowUpload(false)} className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Category</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="kyc">KYC Document</option>
                  <option value="loan">Loan Document</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <DocumentUpload
                title="Select Document"
                description="Upload PDF, JPG, or PNG files (Max 5MB)"
                accept=".pdf,.jpg,.jpeg,.png"
                onUpload={(file) => handleUpload(file, selectedType)}
                loading={uploading}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDocuments;