import AWS from 'aws-sdk/clients/s3'
import { useState } from 'react'

interface S3UploaderProps {
  onUpload: (url: string) => void
  folder: 'image' | 'file'
}

const S3Uploader: React.FC<S3UploaderProps> = ({ onUpload, folder }) => {
  const [uploading, setUploading] = useState(false)

  const uploadToS3 = async (file: File) => {
    const s3 = new AWS({
      accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
      region: process.env.VITE_AWS_REGION,
    })

    const params = {
      Bucket: process.env.VITE_S3_BUCKET_NAME!,
      Key: `${folder}/${Date.now()}_${file.name}`,
      Body: file,
      ACL: 'public-read',
    }

    return new Promise<string>((resolve, reject) => {
      s3.upload(params, (err: Error, data: AWS.ManagedUpload.SendData) => {
        if (err) {
          console.error('Error uploading file:', err)
          reject(err)
        } else {
          console.log('File uploaded successfully:', data)
          resolve(data.Location)
        }
      })
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploading(true)
      const files = Array.from(e.target.files)
      for (const file of files) {
        const url = await uploadToS3(file)
        onUpload(url)
      }
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        multiple
        accept={folder === 'image' ? 'image/*' : '*/*'}
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  )
}

export default S3Uploader
