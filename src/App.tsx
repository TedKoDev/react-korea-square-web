import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar'
import { FaTimes, FaArrowDown } from 'react-icons/fa'

function App() {
  const [isLeftAdOpen, setIsLeftAdOpen] = useState(true)
  const [isRightAdOpen, setIsRightAdOpen] = useState(true)

  const toggleLeftAd = () => setIsLeftAdOpen(!isLeftAdOpen)
  const toggleRightAd = () => setIsRightAdOpen(!isRightAdOpen)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-1">
        <aside
          className={`w-full md:w-1/6 p-4 bg-gray-100 order-1 md:order-none ${
            isLeftAdOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <div
            onClick={toggleLeftAd}
            className="cursor-pointer md:hidden flex items-center"
          >
            {isLeftAdOpen ? <FaTimes size={20} /> : <FaArrowDown size={20} />}
          </div>
          <div className="hidden md:block">{'Left Ad'}</div>
          {isLeftAdOpen && <div className="md:hidden">{'Left Ad'}</div>}
        </aside>
        <main className="flex-1 p-4 order-3 md:order-none">
          <Outlet />
        </main>
        <aside
          className={`w-full md:w-1/6 p-4 bg-gray-100 order-2 md:order-none ${
            isRightAdOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <div
            onClick={toggleRightAd}
            className="cursor-pointer md:hidden flex items-center"
          >
            {isRightAdOpen ? <FaTimes size={20} /> : <FaArrowDown size={20} />}
          </div>
          <div className="hidden md:block">{'Right Ad'}</div>
          {isRightAdOpen && <div className="md:hidden">{'Right Ad'}</div>}
        </aside>
      </div>
    </div>
  )
}

export default App
