import { api } from './api-service'
import useUserStore from '../stores/user-store'

export interface AuthResponse {
  data: {
    access_token: string
  }
}

export interface LoginData {
  email: string
  password: string
}

export interface SignupData {
  username: string
  email: string
  password: string
}

// 로그인 API
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api('/auth')({
    method: 'POST',
    path: '/login',
    data,
  })
  return response.data
}

// 회원가입 API
export const signup = async (data: SignupData): Promise<AuthResponse> => {
  console.log('data', data)
  const response = await api('/auth')({
    method: 'POST',
    path: '/signup',
    data,
  })
  return response.data
}

// 인증 상태 확인 API
export const checkAuth = async (): Promise<AuthResponse> => {
  const response = await api('/auth')({
    method: 'GET',
    path: '/me',
  })
  return response.data
}

// 로그아웃 기능
export const logout = (): void => {
  localStorage.removeItem('token')
  const { clearUser } = useUserStore.getState()
  clearUser()
  window.location.href = '/login' // or use your routing library's navigation
}
