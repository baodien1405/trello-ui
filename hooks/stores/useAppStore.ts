import { User } from '@/models'
import { getUserFromLS } from '@/utils'
import { create } from 'zustand'

interface AppStoreInterface {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
}

export const useAppStore = create<AppStoreInterface>((set) => ({
  currentUser: getUserFromLS(),
  setCurrentUser: (user: User | null) => {
    set({ currentUser: user })
  }
}))
