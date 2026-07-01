// src/components/forms/DocumentUpload.jsx
import React, { useRef, useState } from 'react';
import Button from '../common/Button';

const DocumentUpload = ({ title, description, accept = '.pdf,.jpg,.jpeg,.png', onUpload, loading }) => {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center gap-2"
      >
        <span className="text-4xl mb-1">📁</span>
        <p className="font-semibold text-gray-700">{selectedFile ? selectedFile.name : title}</p>
        <p className="text-xs text-gray-500">{description}</p>
        {selectedFile && (
          <p className="text-xs text-blue-600 font-medium bg-blue-50 px-2.5 py-0.5 rounded-full mt-2">
            File ready to upload ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
      </div>

      {selectedFile && (
        <div className="flex gap-2">
          <Button onClick={handleUploadClick} loading={loading} className="flex-1">
            Submit File
          </Button>
          <button
            onClick={() => setSelectedFile(null)}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 text-sm font-medium"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
