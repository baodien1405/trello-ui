import axios, { AxiosError, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'

import { NextApiEndpoint } from '@/constants'
import { AuthResponse } from '@/models'
import {
  removeAccessTokenToLS,
  removeRefreshTokenToLS,
  removeUserToLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  setUserToLS
} from '@/utils'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10 * 60 * 1000,
  withCredentials: true
})

axiosClient.interceptors.response.use(
  function (response) {
    const { url } = response.config
    if (url && [NextApiEndpoint.AUTH_LOGIN].includes(url)) {
      const { accessToken, refreshToken, user } = response.data.metadata as AuthResponse
      setAccessTokenToLS(accessToken)
      setRefreshTokenToLS(refreshToken)
      setUserToLS(user)
    } else if (url === NextApiEndpoint.AUTH_LOGOUT) {
      removeAccessTokenToLS()
      removeRefreshTokenToLS()
      removeUserToLS()
    }
    return response.data
  },
  function (error: AxiosError) {
    let errorMessage = error?.message

    if ((error?.response?.data as any)?.message) {
      errorMessage = (error?.response?.data as any)?.message
    }

    if (error?.response?.status !== HttpStatusCode.Gone) {
      toast.error(errorMessage)
    }

    return Promise.reject(error.response?.data)
  }
)

export default axiosClient
