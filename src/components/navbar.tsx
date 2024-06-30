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
      <div className="flex justify-end gap-3 px-20 w-full border-gray-300 border-b">
        {isAuthenticated ? (
          <Button to="/mypage" variant="primary" className="my-1 py-0">
            My page
          </Button>
        ) : (
          <Button to="/auth" variant="primary">
            로그인
          </Button>
        )}
        <Link to="/devpage">Dev</Link>
      </div>
      <div className="flex justify-center items-end w-full p-4">
        <span className="text-4xl font-black">Korea Square</span>
        <div className="text-xs bg-yellow-300 ml-2 items-end">βeta</div>
      </div>

      <div className="flex justify-center bg-green-500  w-full  md:w-2/3">
        <Link to="/boards" className="font-mono">
          Square
        </Link>
      </div>
    </header>
  )
}
