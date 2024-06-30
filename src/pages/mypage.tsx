import React, { useState } from 'react'
import Button from '../components/button'

export default function Mypage() {
  const [selectedSection, setSelectedSection] = useState('회원 정보 변경')

  const renderContent = () => {
    switch (selectedSection) {
      case '회원 정보 변경':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">회원 정보 변경</h2>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
              <p className="text-sm">포인트: 0</p>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-100 p-2 rounded-lg">
                ghdxodml@naver.com
              </div>
              <div className="bg-gray-100 p-2 rounded-lg">TaiKoDev</div>
              <button className="bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg">
                정보 수정
              </button>
            </div>
          </div>
        )
      case '내가 쓴 글':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">내가 쓴 글</h2>
            <p>Here is the content for 내가 쓴 글.</p>
          </div>
        )
      case '내가 쓴 댓글':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">내가 쓴 댓글</h2>
            <p>Here is the content for 내가 쓴 댓글.</p>
          </div>
        )
      case '좋아요 한 글':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">좋아요 한 글</h2>
            <p>Here is the content for 좋아요 한 글.</p>
          </div>
        )
      case '좋아요 한 댓글':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">좋아요 한 댓글</h2>
            <p>Here is the content for 좋아요 한 댓글.</p>
          </div>
        )
      case '스크랩 한 글':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">스크랩 한 글</h2>
            <p>Here is the content for 스크랩 한 글.</p>
          </div>
        )
      case '차단한 사용자':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">차단한 사용자</h2>
            <p>Here is the content for 차단한 사용자.</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto font-sans">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <Button
          onClick={() => setSelectedSection('회원 정보 변경')}
          className="rounded-none bg-white border border-gray-300 px-4 py-2 m-1 text-xs sm:text-sm hover:bg-gray-100"
        >
          회원 정보 변경
        </Button>
        <Button
          onClick={() => setSelectedSection('내가 쓴 글')}
          className="rounded-none bg-white border border-gray-300 px-4 py-2 m-1 text-xs sm:text-sm hover:bg-gray-100"
        >
          내가 쓴 글
        </Button>
        <Button
          onClick={() => setSelectedSection('내가 쓴 댓글')}
          className="rounded-none bg-white border border-gray-300 px-4 py-2 m-1 text-xs sm:text-sm hover:bg-gray-100"
        >
          내가 쓴 댓글
        </Button>
        <Button
          onClick={() => setSelectedSection('좋아요 한 글')}
          className="rounded-none bg-white border border-gray-300 px-4 py-2 m-1 text-xs sm:text-sm hover:bg-gray-100"
        >
          좋아요 한 글
        </Button>
        <Button
          onClick={() => setSelectedSection('좋아요 한 댓글')}
          className="rounded-none bg-white border border-gray-300 px-4 py-2 m-1 text-xs sm:text-sm hover:bg-gray-100"
        >
          좋아요 한 댓글
        </Button>
        <Button
          onClick={() => setSelectedSection('스크랩 한 글')}
          className="rounded-none bg-white border border-gray-300 px-4 py-2 m-1 text-xs sm:text-sm hover:bg-gray-100"
        >
          스크랩 한 글
        </Button>
        <Button
          onClick={() => setSelectedSection('차단한 사용자')}
          className="rounded-none bg-white border border-gray-300 px-4 py-2 m-1 text-xs sm:text-sm hover:bg-gray-100
          
          "
        >
          차단한 사용자
        </Button>
      </div>
      {renderContent()}
    </div>
  )
}
