import { useQuery, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  login,
  signup,
  checkAuth,
  LoginData,
  SignupData,
  AuthResponse,
} from '../services/authAPI'

// 로그인 훅
export const useLogin = () => {
  const mutation = useMutation<AuthResponse, AxiosError, LoginData>(
    login as any
  )
  return mutation
}

// 회원가입 훅
export const useSignup = () => {
  const mutation = useMutation<AuthResponse, AxiosError, SignupData>(
    signup as any
  )
  return mutation
}

// 인증 상태 확인 훅
export const useCheckAuth = () => {
  const query = useQuery<AuthResponse, AxiosError>(['checkAuth'], checkAuth)
  return query
}
