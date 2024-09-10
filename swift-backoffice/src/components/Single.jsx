import React, { useState } from 'react';
import axios from 'axios';

function Single() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFileName(response.data.file);
    } catch (err) {
      setError('Error uploading file');
    }
  };

  const handleDownload = () => {
    window.location.href = `http://localhost:5000/download/${fileName}`;
  };

  const handleView = () => {
    window.open(`http://localhost:5000/view/${fileName}`, '_blank'); // Opens Excel file in a new tab
  };
  
  

  return (
    <div className="single flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Upload PDF and Process to Excel</h1>
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button 
        onClick={handleUpload} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Upload and Process
      </button>
      {fileName && (
        <div className="mt-4 flex space-x-4">
          <button 
            onClick={handleView} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
          >
            View Excel
          </button>
          <button 
            onClick={handleDownload} 
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
          >
            Download Excel
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Single;
