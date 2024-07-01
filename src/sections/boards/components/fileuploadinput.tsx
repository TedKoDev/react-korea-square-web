import React, { useState } from 'react'
import {
  FaFilePdf,
  FaFileImage,
  FaFileWord,
  FaFileExcel,
  FaFileArchive,
  FaFile,
  FaTrashAlt,
} from 'react-icons/fa'

const FileUploadInput = () => {
  const [files, setFiles] = useState([])

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const renderFileIcon = (file) => {
    const mimeType = file.type

    if (mimeType.startsWith('image/'))
      return <FaFileImage className="text-blue-500 w-6 h-6" />
    if (mimeType === 'application/pdf')
      return <FaFilePdf className="text-red-500 w-6 h-6" />
    if (
      mimeType === 'application/msword' ||
      mimeType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
      return <FaFileWord className="text-blue-700 w-6 h-6" />
    if (
      mimeType === 'application/vnd.ms-excel' ||
      mimeType ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
      return <FaFileExcel className="text-green-700 w-6 h-6" />
    if (
      mimeType === 'application/zip' ||
      mimeType === 'application/x-rar-compressed'
    )
      return <FaFileArchive className="text-yellow-500 w-6 h-6" />
    return <FaFile className="text-gray-500 w-6 h-6" />
  }

  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName))
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center justify-center border-dashed border-4 border-gray-300 p-6 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="text-gray-600 cursor-pointer">
          <p className="text-xl">Drag & Drop files here or click to upload</p>
        </label>
      </div>
      <div className="mt-6">
        {files.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Uploaded Files</h2>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-white border rounded-lg shadow-sm mb-2"
              >
                <div className="flex items-center">
                  {renderFileIcon(file)}
                  <span className="ml-3 text-gray-800">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(file.name)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUploadInput
