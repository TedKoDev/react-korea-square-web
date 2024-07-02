import { getPresignedUrl } from './getPresignedUrl'

export async function uploadFileToS3(file: any) {
  const { url: presignedUrl, key } = await getPresignedUrl(file.type)

  console.log('Uploading file to S3:', presignedUrl, key)

  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  })
  console.log('Response from S3:', response)

  if (!response.ok) {
    const errorText = await response.text() // 응답 텍스트를 확인하여 디버깅
    console.error('Error uploading file to S3:', errorText)
    throw new Error('Failed to upload file to S3')
  }

  const fileUrl = `https://${import.meta.env.VITE_APP_S3_BUCKET_NAME}.s3.${
    import.meta.env.VITE_APP_AWS_REGION
  }.amazonaws.com/${key}`

  console.log('File uploaded to S3:', fileUrl)
  return fileUrl
}
