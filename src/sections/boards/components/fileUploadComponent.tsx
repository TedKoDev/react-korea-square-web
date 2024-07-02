import React, { useRef, useState } from 'react'
import { FaFileAlt, FaTimes } from 'react-icons/fa'

interface FileUploadComponentProps {}

interface FileItem {
  file: File
  id: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_FILES = 2

const FileUploadComponent: React.FC<FileUploadComponentProps> = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<FileItem[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files)
      if (selectedFiles.length + files.length > MAX_FILES) {
        setError(`You can only upload up to ${MAX_FILES} files.`)
        return
      }

      const newFiles: FileItem[] = []
      for (const file of selectedFiles) {
        if (file.size > MAX_FILE_SIZE) {
          setError(
            `File size should be less than ${MAX_FILE_SIZE / (1024 * 1024)} MB.`
          )
          return
        }
        newFiles.push({ file, id: URL.createObjectURL(file) })
      }

      setFiles((prevFiles) => [...prevFiles, ...newFiles])
      setError(null) // Clear any previous errors
    }
  }

  const removeFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((fileItem) => fileItem.id !== id))
  }

  return (
    <div className="mt-4">
      <h2 className="font-semibold">파일 첨부</h2>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
        className="border rounded p-2"
        disabled={files.length >= MAX_FILES}
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <div className="mt-4">
        {files.length > 0 && (
          <ul>
            {files.map((fileItem) => (
              <li
                key={fileItem.id}
                className="flex items-center justify-between p-2 border-b"
              >
                <div className="flex items-center">
                  <FaFileAlt className="mr-2" />
                  <span>{fileItem.file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(fileItem.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default FileUploadComponent
