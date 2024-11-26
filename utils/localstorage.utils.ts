import { StorageKey } from '@/constants'
import { User } from '@/models'

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

export const getUserFromLS = () => {
  try {
    return JSON.parse(localStorage.getItem(StorageKey.USER) || '')
  } catch (error) {
    return null
  }
}

export const setUserToLS = (user: User) => {
  localStorage.setItem(StorageKey.USER, JSON.stringify(user))
}

export const removeUserToLS = () => {
  localStorage.removeItem(StorageKey.USER)
}
