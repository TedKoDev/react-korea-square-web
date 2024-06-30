import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'

// Define a type for the user's state
type JwtPayload = {
  id: number
  email: string
  username: string
  role: string
}

type UserStateType = {
  user:
    | JwtPayload
    | null
    | import('c:/Users/user/Desktop/DEV/react/react-korea-square/node_modules/jwt-decode/build/esm/index').JwtPayload
  isAuthenticated: boolean
  setUser: (userData: JwtPayload | null) => void
  clearUser: () => void
}

// Create a store for the user state
const useUserStore = create<UserStateType>((set) => {
  const token = localStorage.getItem('token')
  let user = null
  let isAuthenticated = false

  if (token) {
    try {
      user = jwtDecode(token)
      isAuthenticated = true
    } catch (error) {
      console.error('Invalid token:', error)
      localStorage.removeItem('token')
    }
  }

  return {
    user,
    isAuthenticated,
    setUser: (userData) => set({ user: userData, isAuthenticated: true }),
    clearUser: () => set({ user: null, isAuthenticated: false }), // Reset the user to null and set isAuthenticated to false
  }
})

export default useUserStore
