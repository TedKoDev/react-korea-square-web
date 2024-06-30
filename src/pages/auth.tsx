import React, { useRef, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import GrayLine from '../components/grayline'
import LoginForm from '../components/loginform'
import SignupForm from '../components/signupform'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const nodeRef = useRef(null)
  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="font-bold mb-5 animate-bounce mt-10">Welcome</div>

      <div className="flex w-1/2 border p-2 border-gray-300 rounded-full mb-5 transition">
        <div
          className={`flex-1 py-2 text-center cursor-pointer rounded-full hover:bg-gray-100
             ${isLogin ? 'bg-gray-200' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          LogIn
        </div>
        <div
          className={`flex-1 py-2 text-center cursor-pointer rounded-full hover:bg-gray-100 ${
            !isLogin ? 'bg-gray-200' : ''
          }`}
          onClick={() => setIsLogin(false)}
        >
          SignUp
        </div>
      </div>

      <SwitchTransition>
        <CSSTransition
          key={isLogin ? 'login' : 'signup'}
          nodeRef={nodeRef}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div className="w-full sm:w-1/2" ref={nodeRef}>
            {isLogin ? <LoginForm /> : <SignupForm />}
          </div>
        </CSSTransition>
      </SwitchTransition>

      <div className="h-5" />
      <div className="flex flex-row w-full sm:w-1/2 justify-center items-center">
        <GrayLine thickness="1px" className="flex-grow" />
        <div className="text-gray-500 mx-2 flex items-center whitespace-nowrap">
          or login with
        </div>
        <GrayLine thickness="1px" className="flex-grow" />
      </div>
      <div className="h-5" />
      <button
        className="flex items-center w-full sm:w-1/2 justify-center h-10 border border-gray-200 text-black rounded-md
          hover:bg-gray-300 focus:outline-none transition ease-in-out duration-150 transform active:scale-95"
        onClick={() => alert('Google login 준비중입니다.')}
      >
        <img
          src="/src/assets/google-icon.svg"
          alt="google"
          className="w-5 h-5"
        />
        <span className="ml-2">Continue with Google</span>
      </button>
    </div>
  )
}

export default Auth
