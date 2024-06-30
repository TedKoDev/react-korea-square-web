import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'none'
  to?: string // 네비게이션을 위한 prop 추가
  width?: string // 가로 길이를 제어하기 위한 prop 추가
  height?: string // 높이를 제어하기 위한 prop 추가
  style?: React.CSSProperties // 추가적인 스타일을 위한 prop 추가
  className?: string // 추가적인 클래스를 위한 prop 추가
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'none',
  to,
  width = 'auto', // 기본값을 'auto'로 설정
  height = 'auto', // 기본값을 'auto'로 설정
  style = {}, // 기본값을 빈 객체로 설정
  className = '', // 기본값을 빈 문자열로 설정
}) => {
  const navigate = useNavigate()
  const baseStyles =
    'px-4 py-2 rounded-3xl focus:outline-none transition ease-in-out duration-150 transform'
  const variantStyles = {
    primary:
      'bg-yellow-300 hover:bg-yellow-400 active:scale-95 text-black font-bold',
    secondary:
      'bg-gray-500 hover:bg-gray-700 active:scale-95 text-black font-bold',
    danger: 'bg-red-500 hover:bg-red-700 active:scale-95 text-black font-bold',
    none: 'active:scale-95',
  }

  const classNames = `${baseStyles} ${variantStyles[variant]} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`

  const combinedStyle: React.CSSProperties = {
    width: width !== 'auto' ? width : undefined,
    height: height !== 'auto' ? height : undefined,
    ...style, // 사용자로부터 받은 스타일을 병합
  }

  const handleClick = () => {
    if (disabled) return

    if (to) {
      navigate(to)
    } else if (onClick) {
      onClick()
    }
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={classNames}
      style={combinedStyle}
    >
      {children}
    </button>
  )
}

export default Button
