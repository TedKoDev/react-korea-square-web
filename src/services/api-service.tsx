import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { KOREA_SQUARE_COMMUNITY_BASE_URL } from './config'
import { getToken, storeToken } from './utils-service'

interface AugmentedAxiosRequestConfig extends AxiosRequestConfig {
  isRetry?: boolean
}

// Function to create an Axios instance with dynamic baseURL
function createApiClient(baseURL: string) {
  const apiClient = axios.create({
    baseURL: baseURL,
    responseType: 'json',
  })

  apiClient.interceptors.request.use(
    async (config: AugmentedAxiosRequestConfig): Promise<any> => {
      const token = getToken()
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }
      }
      return config
    }
  )

  apiClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error): Promise<any> => {
      const originalRequest: AugmentedAxiosRequestConfig = error.config

      if (error.response?.status === 401 && !originalRequest.isRetry) {
        originalRequest.isRetry = true
        try {
          const refreshedIdToken: string = 'refreshedIdToken' // replace this with actual token refresh logic
          storeToken(refreshedIdToken)

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${refreshedIdToken}`,
          }
          return apiClient(originalRequest)
        } catch (refreshError) {
          return Promise.reject(refreshError)
        }
      }

      if (error.response) {
        console.error('HTTP Error:', error.response.status, error.response.data)
      } else {
        console.error('Network or other error:', error.message)
      }

      return Promise.reject(error)
    }
  )

  return apiClient
}

const api = (servicePath: string) => {
  const baseUrl = KOREA_SQUARE_COMMUNITY_BASE_URL
  const apiClient = createApiClient(baseUrl)

  return ({
    method,
    path,
    data,
  }: {
    method: Method
    path: string
    data?: any
  }): Promise<AxiosResponse> => {
    // GET 메소드에 대해 쿼리 파라미터를 URL에 추가
    const url =
      method === 'GET' && data
        ? `${servicePath}${path}?${new URLSearchParams(data).toString()}`
        : `${servicePath}${path}`

    return apiClient.request({
      url: url,
      method: method,
      ...(method !== 'GET' && { data }), // GET 메소드가 아닐 때만 요청 바디에 데이터를 포함
    })
  }
}

export { api }
