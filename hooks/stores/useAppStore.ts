import { create } from 'zustand'

import { Card, User } from '@/models'
import { getUserFromLS } from '@/utils'

interface AppStoreInterface {
  currentUser: User | null
  activeCard: Card | null
  setCurrentUser: (user: User | null) => void
  setActiveCard: (card: Card | null) => void
}

export const useAppStore = create<AppStoreInterface>((set) => ({
  currentUser: getUserFromLS(),
  activeCard: null,
  setCurrentUser: (user: User | null) => {
    set({ currentUser: user })
  },
  setActiveCard: (card: Card | null) => {
    set({ activeCard: card })
  }
}))
