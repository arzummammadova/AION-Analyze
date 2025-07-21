'use client'
import React, { useState } from 'react'

interface FileUploadFormProps{
  onResponse:(response:string)=>void
}


const FileUploadForm:React.FC<FileUploadFormProps> = ({onResponse}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };
  function handleSubmit(){
    if(selectedFile){
      onResponse(selectedFile.name)
      alert("File uploaded")
    }
    else{
      alert("Select file please")
    }
  
  }
  return (
    <div>
       <input type="file" onChange={handleFileChange}  className='border border-black'/>
     {selectedFile && <span>File adi{selectedFile.name}</span>}
      <button onClick={handleSubmit}>Analiz et </button>
    </div>
  )
}

export default FileUploadForm
