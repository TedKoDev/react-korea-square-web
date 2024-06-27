import React from 'react'
import { Controller } from 'react-hook-form'

interface InputProps {
  name: string
  control: any
  label: string
  rules?: any
  type?: string
  placeholder?: string
  disabled?: boolean
  width?: string
  height?: string
  style?: React.CSSProperties
}

const Input: React.FC<InputProps> = ({
  name,
  control,
  label,
  rules,
  type = 'text',
  placeholder = '',
  disabled = false,
  width = 'auto',
  height = 'auto',
  style = {},
}) => {
  const combinedStyle: React.CSSProperties = {
    width: width !== 'auto' ? width : undefined,
    height: height !== 'auto' ? height : undefined,
    ...style,
  }

  const inputBaseClass =
    'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring transition ease-in-out duration-150'
  const inputTypeClass =
    type === 'email' || type === 'password'
      ? 'bg-gray-200 focus:bg-white'
      : 'bg-white'
  const errorClass = 'border-red-500'

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={`${inputBaseClass} ${inputTypeClass} ${
                error ? errorClass : 'border-gray-300'
              }`}
              style={combinedStyle}
            />
            {error && (
              <span className="text-red-500 text-sm">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  )
}

export default Input
