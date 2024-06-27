import { Link } from 'react-router-dom'
import { GiBookshelf } from 'react-icons/gi'

import Button from './button'

export default function navbar() {
  return (
    <header className="flex py-2 justify-evenly bg-gray-100  border-gray-300 border-b-2 *:align-middle *:items-center">
      <Link to="/" className="flex  gap-2">
        <GiBookshelf />
        <h1>Korea-Square</h1>
      </Link>

      <div className="flex gap-5">
        <Link to="/boards " className="font-mono">
          Square
        </Link>
        <Link to="/mypage" className="font-mono">
          My page
        </Link>
      </div>
      <div className="flex gap-3">
        <Button to="/auth">로그인</Button>
        <Link to="/devpage">Dev</Link>
      </div>
    </header>
  )
}
