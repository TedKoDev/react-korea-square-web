import { Link, useNavigate } from 'react-router-dom'
import Button from './button'
import useUserStore from '../stores/user-store'

export default function Navbar() {
  const { isAuthenticated, clearUser } = useUserStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    clearUser()
    navigate('/')
  }

  return (
    <header className="flex flex-col items-center w-full border-b border-gray-300">
      <div className="flex justify-end gap-3 px-20 w-full border-gray-300 border-b ">
        {isAuthenticated ? (
          <Button to="/mypage" variant="primary" className="my-1">
            My page
          </Button>
        ) : (
          <Button to="/auth" variant="primary" className="my-1">
            로그인
          </Button>
        )}
        <div className="flex ">
          {isAuthenticated && (
            <Button onClick={handleLogout} variant="danger" className="my-1">
              로그아웃
            </Button>
          )}
        </div>
      </div>
      <Link to="/" className="flex justify-center items-end w-full p-4">
        <span className="text-4xl font-black">Korea Square</span>
        <div className="text-xs bg-yellow-300 ml-2 items-end">βeta</div>
      </Link>

      <div className="flex  items-center justify-center bg-green-500 gap-5 md:gap-10 w-full  h-9  text-center align-middle  md:w-2/3">
        <Link to="/study" className="font-mono ">
          Study
        </Link>
        {/* <div className=" border-l-2 border-l-gray-600 h-full w-1"></div> */}
        <Link to="/boards" className="font-mono ">
          Community
        </Link>
        {/* <div className=" border-l-2 border-l-gray-600 h-full w-1"></div> */}
        <Link to="/boards" className="font-mono ">
          Game
        </Link>
        {/* <div className=" border-l-2 border-l-gray-600 h-full w-1"></div> */}
        <Link to="/boards" className="font-mono">
          Q&A
        </Link>
        {/* <div className=" border-l-2 border-l-gray-600 h-full w-1"></div> */}
        <Link to="/devpage" className="font-mono">
          Dev
        </Link>
      </div>
    </header>
  )
}
