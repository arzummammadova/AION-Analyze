'use client';

import { useState } from "react";
import FileUploadForm from "./components/FileUploadForm";
import ResponseDisplay from "./components/ResponseDisplay";

export default function Home() {
  const [alysatorResponse,setAlysatorResponse] = useState<string>('');

  const handleAnalysisResponse=(response:string)=>{
    setAlysatorResponse(response);
  }

  return (
    <div className="flex flex-col mx-auto justify-center items-center min-h-screen ">
      <h1 className="text-4xl text-center py-2 ">AION-File An AION alysator files</h1>
      <section className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg mb-8  border-dotted border-gray-300 border-3 ">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          <span className="text-blue-500">Upload</span> your file to get started

        </h2>
        <FileUploadForm onResponse={handleAnalysisResponse} />
      </section>
      <section className="p-8 rounded-lg shadow-xl w-full max-w-lg mb-8">
        <h2 className="text-2xl font semibold text-gray-700">
          your file will be processed and displayed here
        </h2>
        <ResponseDisplay response={alysatorResponse}/>
      </section>

      
    </div>
  );
}
