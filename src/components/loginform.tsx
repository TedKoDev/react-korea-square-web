import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from './input'
import Button from './button'

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
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Input
        name="email"
        control={control}
        label=""
        rules={{ required: 'Email is required' }}
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
