import { authApi } from '@/api/auth.api'
import axios, { AxiosError, AxiosRequestConfig, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10 * 60 * 1000,
  withCredentials: true
})

let refreshTokenPromise: Promise<any> | null = null

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      authApi.logout()
      return
    }

    const originalRequest = error.config as AxiosRequestConfig<any>

    if (error.response?.status === HttpStatusCode.Gone) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = authApi
          .refreshToken()
          .then((data) => {
            return data.metadata
          })
          .catch((_error) => {
            authApi.logout()
            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      return refreshTokenPromise.then(() => {
        return axiosClient(originalRequest)
      })
    }

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
