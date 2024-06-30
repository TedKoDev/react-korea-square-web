import React from 'react'

export default function infosection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">회원 정보 변경</h2>
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
        <p className="text-sm">포인트: 0</p>
      </div>
      <div className="space-y-2">
        <div className="bg-gray-100 p-2 rounded-lg">ghdxodml@naver.com</div>
        <div className="bg-gray-100 p-2 rounded-lg">TaiKoDev</div>
        <button className="bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg">
          정보 수정
        </button>
      </div>
    </div>
  )
}
