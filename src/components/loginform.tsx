import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from './input'
import Button from './button'
import { login } from '../services/authAPI'
import useUserStore from '../stores/user-store'
import { jwtDecode } from 'jwt-decode'

// Define the JWT payload interface
export interface JwtPayload {
  id: number
  email: string
  username: string
  role: string
  iat?: number
  exp?: number
}

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

type FormData = z.infer<typeof schema>

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      })
      console.log(result) // 비동기 함수의 결과를 처리

      const token = result.data.access_token // 토큰을 추출
      localStorage.setItem('token', token) // 토큰을 로컬 스토리지에 저장

      const decoded = jwtDecode<JwtPayload>(token) // 토큰을 디코딩
      const { id, email, username, role } = decoded

      useUserStore.getState().setUser({ id, email, username, role })
      window.location.href = '/' // or use your routing library's navigation
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Input
        name="email"
        control={control}
        label=""
        rules={{ required: 'Email is requiredd' }}
        placeholder="email"
        width="100%"
      />

      <Input
        name="password"
        control={control}
        label=""
        type="password"
        rules={{ required: 'Password is required' }}
        placeholder="password"
        width="100%"
      />

      <button
        type="submit"
        className="w-full bg-yellow-300 hover:bg-yellow-400 active:scale-95 text-black font-bold px-4 py-2 rounded-3xl focus:outline-none transition ease-in-out duration-150 transform"
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
