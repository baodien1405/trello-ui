import { jwtDecode } from 'jwt-decode'

import { User } from '@/models'
import { authApi } from '@/api'
import {
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS
} from '@/utils/localstorage.utils'

interface TokenPayload {
  user: User
  exp: number
  iat: number
}

export const checkAndRefreshToken = async (params?: {
  force?: boolean
  onSuccess?: () => void
  onError?: () => void
}) => {
  const accessToken = getAccessTokenFromLS()
  const refreshToken = getRefreshTokenFromLS()

  if (!accessToken || !refreshToken) return

  const decodeAccessToken = jwtDecode<TokenPayload>(accessToken)
  const decodeRefreshToken = jwtDecode<TokenPayload>(refreshToken)

  const COOKIE_SET_DELAY_SECONDS = 1
  const now = new Date().getTime() / 1000 - COOKIE_SET_DELAY_SECONDS

  const isExpiredRefreshToken = decodeRefreshToken.exp <= now

  if (isExpiredRefreshToken) {
    await authApi.logout()

    if (params?.onError) {
      params.onError()
    }

    return
  }

  const remainingAccessTokenTime = decodeAccessToken.exp - now
  const validAccessTokenDuration = decodeAccessToken.exp - decodeAccessToken.iat

  if (params?.force || remainingAccessTokenTime < validAccessTokenDuration / 3) {
    try {
      const response = await authApi.refreshToken()
      setAccessTokenToLS(response.metadata.accessToken)
      setAccessTokenToLS(response.metadata.refreshToken)
      if (params?.onSuccess) {
        params.onSuccess()
      }
    } catch (error) {
      if (params?.onError) {
        params.onError()
      }
    }
  }
}
