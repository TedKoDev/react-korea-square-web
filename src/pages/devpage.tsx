import { useState } from 'react'
import Button from '../components/button'
import devhistory from '../sections/devpage/devhistory'

export default function devpage() {
  const [selectedSection, setSelectedSection] = useState('개발 히스토리')

  const sections = [{ name: '개발 히스토리', component: devhistory }]

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
