import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from './input'
import { signup } from '../services/authAPI'

const schema = z
  .object({
    username: z.string().min(2, 'Username must be at least 2 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

const SignupForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      const result = await signup({
        username: data.username,
        email: data.email,
        password: data.password,
      })
      if (result) {
        const confirmed = window.confirm(
          '회원가입이 완료되었습니다. 로그인을 진행해 주세요'
        )
        if (confirmed) {
          window.location.reload() // 페이지 새로고침
        }
      }
    } catch (error) {
      console.error('Signup failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Input
        name="username"
        control={control}
        label="Username"
        placeholder="Username"
        width="100%"
      />
      <Input
        name="email"
        control={control}
        label="Email"
        placeholder="Email"
        width="100%"
      />
      <Input
        name="password"
        control={control}
        label="Password"
        type="password"
        placeholder="Password"
        width="100%"
      />
      <Input
        name="confirmPassword"
        control={control}
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
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

export default SignupForm
