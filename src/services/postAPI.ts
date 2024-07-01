import { api } from './api-service'

// 글추가 API
export const addpost = async (data: any): Promise<any> => {
  const response = await api('/posts')({
    method: 'POST',
    path: '/addpost',
    data,
  })
  return response.data
}
