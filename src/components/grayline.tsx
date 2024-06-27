import React from 'react'

type GrayLineProps = {
  thickness?: string // 굵기를 조절할 수 있는 prop
  className?: string // 추가적인 Tailwind CSS 클래스를 지정할 수 있는 prop
}

function GrayLine({ thickness = '1px', className = '' }: GrayLineProps) {
  return (
    <div
      className={`w-full bg-gray-300 ${className}`}
      style={{ height: thickness }}
    />
  )
}

export default GrayLine
