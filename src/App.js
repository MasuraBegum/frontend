// App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCheckPlagiarism = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://your-backend-api/plagiarism-check', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data.result);
    } catch (error) {
      console.error('Error checking plagiarism:', error);
    }
  };

  return (
    <div className="app">
      <div className="center-container">
        <h1>Plagiarism Detector</h1>

        <div className="input-container">
          <input type="file" accept=".txt" onChange={handleFileChange} />
        </div>

        <button onClick={handleCheckPlagiarism}>Check Plagiarism</button>

        {result && (
          <div className="result-container">
            <h2>Plagiarism Result:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
