import React, { useState } from 'react'
import Button from '../components/button'
import infosection from '../sections/mypage/info-section'
import postssection from '../sections/mypage/posts-section'
import commentsection from '../sections/mypage/comment-section'
import likedsection from '../sections/mypage/liked-section'
import likedcommentsection from '../sections/mypage/liked-comment-section'
import scrappedpostsection from '../sections/mypage/scrapped-post-section'
import BlockedUsersSection from '../sections/mypage/blocked-users-section'

export default function Mypage() {
  const [selectedSection, setSelectedSection] = useState('회원 정보 변경')

  const sections = [
    { name: '회원 정보 변경', component: infosection },
    { name: '내가 쓴 글', component: postssection },
    { name: '내가 쓴 댓글', component: commentsection },
    { name: '좋아요 한 글', component: likedsection },
    { name: '좋아요 한 댓글', component: likedcommentsection },
    { name: '스크랩 한 글', component: scrappedpostsection },
    { name: '차단한 사용자', component: BlockedUsersSection },
  ]

  const renderContent = () => {
    const section = sections.find((section) => section.name === selectedSection)
    return section ? section.component() : null
  }

  return (
    <div className="max-w-2xl mx-auto font-sans">
      <div className="grid grid-cols-2 sm:grid-cols-4 mb-4">
        {sections.map((section) => (
          <Button
            key={section.name}
            onClick={() => setSelectedSection(section.name)}
            className="rounded-none bg-white border border-gray-300 px-4 m-1 text-xs md:text-sm hover:bg-gray-100"
          >
            {section.name}
          </Button>
        ))}
      </div>
      {renderContent()}
    </div>
  )
}
