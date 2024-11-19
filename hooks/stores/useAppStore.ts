import { User } from '@/models'
import { create } from 'zustand'

interface AppStoreInterface {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
}

export const useAppStore = create<AppStoreInterface>((set) => ({
  currentUser: null,
  setCurrentUser: (user: User | null) => {
    set({ currentUser: user })
  }
}))
