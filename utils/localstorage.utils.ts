import { StorageKey } from '@/constants'

export const getAccessTokenFromLS = () => {
  return localStorage.getItem(StorageKey.ACCESS_TOKEN)
}

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken)
}

export const removeAccessTokenToLS = () => {
  localStorage.removeItem(StorageKey.ACCESS_TOKEN)
}

export const getRefreshTokenFromLS = () => {
  return localStorage.getItem(StorageKey.REFRESH_TOKEN)
}

export const setRefreshTokenToLS = (refreshToken: string) => {
  localStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken)
}

export const removeRefreshTokenToLS = () => {
  localStorage.removeItem(StorageKey.REFRESH_TOKEN)
}
