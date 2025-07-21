// src/components/ResponseDisplay.tsx
'use client'; // Bu komponent də client komponent olmalıdır

import React from 'react';

interface ResponseDisplayProps {
  response: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  return (
    <div className="border border-gray-300 p-6 min-h-[150px] overflow-auto text-gray-700 rounded-md bg-gray-50 break-words whitespace-pre-wrap">
      {response ? (
        <p>{response}</p>
      ) : (
        <p className="text-gray-400 italic">Analiz nəticəsi burada görünəcək...</p>
      )}
    </div>
  );
};

export default ResponseDisplay;