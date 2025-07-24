// src/app/components/FileUploadForm.tsx
'use client';

import React, { useState } from 'react';
import axios from 'axios';
// Import the AnalysisResult interface from your page.tsx file
import { AnalysisResult } from '../page'; // Adjust the path if necessary

interface FileUploadFormProps {
  // Use the imported AnalysisResult type here instead of 'any'
  onResponse: (response: AnalysisResult) => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onResponse }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setError(null);
    } else {
      setSelectedFile(null);
    }
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Zəhmət olmasa, bir fayl seçin.');
      onResponse({ status: 'error', message: 'Zəhmət olmasa, bir fayl seçin.' }); // Ensure this matches AnalysisResult
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('document', selectedFile);

    if (question.trim()) {
      formData.append('question', question.trim());
    }

    try {
      const response = await axios.post<AnalysisResult>('http://localhost:5000/analyze', formData, { // Add <AnalysisResult> here
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onResponse(response.data);

    } catch (err) {
      let errorMessage = 'Fayl yükləmə zamanı xəta baş verdi.';
      let errorResponse: AnalysisResult = { status: 'error', message: errorMessage };

      if (axios.isAxiosError(err) && err.response) {
        // Try to cast to AnalysisResult if the backend error structure matches
        const backendError = err.response.data as AnalysisResult;
        errorMessage = backendError.message || backendError.error || errorMessage;
        errorResponse = { ...backendError, status: 'error', message: errorMessage };
      }
      setError(errorMessage);
      onResponse(errorResponse);
      console.error('Fayl yükləmə xətası:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
        accept=".pdf,.docx,.txt"
      />
      {selectedFile && (
        <p className="text-gray-600 text-sm">
          Seçilən fayl: <span className="font-medium">{selectedFile.name}</span>
        </p>
      )}

      <textarea
        value={question}
        onChange={handleQuestionChange}
        placeholder="Fayl haqqında sualınızı buraya yazın (məsələn: 'Bu sənədin əsas mövzusu nədir?')"
        rows={3}
        className="w-full p-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      <button
        onClick={handleSubmit}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-7 transition duration-300 ease-in-out ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isLoading}
      >
        {isLoading ? 'Analiz Edilir...' : 'Analiz Et'}
      </button>
    </div>
  );
};

export default FileUploadForm;