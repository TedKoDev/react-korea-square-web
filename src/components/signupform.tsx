import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from './input'
import Button from './button'

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
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Input
        name="username"
        control={control}
        label=""
        rules={{ required: 'Username is required' }}
        placeholder="Username"
        width="100%"
      />
      <Input
        name="email"
        control={control}
        label=""
        rules={{ required: 'Email is required' }}
        placeholder="Email"
        width="100%"
      />
      <Input
        name="password"
        control={control}
        label=""
        type="password"
        rules={{ required: 'Password is required' }}
        placeholder="Password"
        width="100%"
      />
      <Input
        name="confirmPassword"
        control={control}
        label=""
        type="password"
        rules={{ required: 'Confirm Password is required' }}
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
