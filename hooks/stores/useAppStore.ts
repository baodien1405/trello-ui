import { create } from 'zustand'

interface AppStoreInterface {
  currentUser: any
  setCurrentUser: (user?: any) => void
}

export const useAppStore = create<AppStoreInterface>((set) => ({
  currentUser: null,
  setCurrentUser: (user: any) => {
    set({ currentUser: user })
    if (!user) {
      // removeAccessTokenToLS()
      // removeRefreshTokenToLS()
    }
  }
}))
