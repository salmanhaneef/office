import React, { useState } from 'react';  
import axios from 'axios';  

function Comparison() {  
  const [file1, setFile1] = useState(null);  
  const [file2, setFile2] = useState(null);  
  const [fileName, setFileName] = useState('');  
  const [error, setError] = useState('');  
  const [loading, setLoading] = useState(false);  // Added loading state  

  const handleFileChange1 = (e) => {  
    setFile1(e.target.files[0]);  
    setError('');  
  };  

  const handleFileChange2 = (e) => {  
    setFile2(e.target.files[0]);  
    setError('');  
  };  

  const handleUpload = async () => {  
    if (!file1 || !file2) {  
      setError('Please select both files.');  
      return;  
    }  

    const formData = new FormData();  
    formData.append('file1', file1);  
    formData.append('file2', file2);  

    setLoading(true);  // Start loading  

    try {  
      const response = await axios.post('http://localhost:5000/upload1', formData, {  
        headers: {  
          'Content-Type': 'multipart/form-data',  
        },  
      });  
      setFileName(response.data.file);  
      setLoading(false);  // End loading  
    } catch (err) {  
      setLoading(false);  // End loading  
      console.error(err);  
      setError('Error uploading files.' + (err.response ? ` ${err.response.data.error}` : ''));  
    }  
  };  

  const handleDownload = () => {  
    window.location.href = `http://localhost:5000/download1/${fileName}`;  
  };  

  const handleView = () => {  
    window.location.href = `http://localhost:5000/view1/${fileName}`;  
  };  

  return (  
    <div className="max-w-lg mx-auto p-4">  
      <h1 className="text-2xl font-bold mb-4">Upload Two PDFs and Compare</h1>  
      <input  
        type="file"  
        onChange={handleFileChange1}  
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 mb-4"  
      />  
      <input  
        type="file"  
        onChange={handleFileChange2}  
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 mb-4"  
      />  
        {loading ? (  
        <p className="text-blue-600">Uploading...</p> // Show loading text  
      ) : (  
        <button  
          onClick={handleUpload}  
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"  
        >  
          Upload and Compare  
        </button>  
      )}  
      {fileName && (  
        <div className="space-x-2">  
          <button  
            onClick={handleView}  
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"  
          >  
            View Excel  
          </button>  
          <button  
            onClick={handleDownload}  
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"  
          >  
            Download Excel  
          </button>  
        </div>  
      )}  
      {error && <p className="text-red-500 mt-4">{error}</p>}  
    </div>  
  );  
}  

export default Comparison;