export async function getPresignedUrl(contentType: any) {
  console.log('Getting presigned URL for content type:', contentType)
  const response = await fetch(
    `http://localhost:4000/v1/s3/presigned-url?contentType=${encodeURIComponent(
      contentType
    )}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )

  console.log('Presigned URL response:', response)

  if (!response.ok) {
    const errorText = await response.text() // 응답 텍스트를 확인하여 디버깅
    console.error('Error fetching presigned URL:', errorText)
    throw new Error('Failed to get presigned URL')
  }

  const result = await response.json()
  console.log('Presigned result:', result)
  return result
}
