import { create } from 'zustand'

// Define a type for the user's state
type UserStateType = {
  user: {
    sub: number
    user_id: number
    email: string
    role: string
    iat: number
    exp: number
  } | null
  setUser: (userData: UserStateType['user']) => void // Correct the setUser type
  clearUser: () => void
}

// Create a store for the user state
const useUserStore = create<UserStateType>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }), // Reset the user to null
}))

export default useUserStore
