import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  SuccessResponse,
  VerifyPayload
} from '@/models'
import axiosClient from './axios-client'
import { ApiEndpoint, NextApiEndpoint } from '@/constants'

export const authApi = {
  register(
    payload: Omit<RegisterPayload, 'confirm_password'>
  ): Promise<SuccessResponse<AuthResponse>> {
    return axiosClient.post(NextApiEndpoint.AUTH_REGISTER, payload, {
      baseURL: ''
    })
  },

  login(payload: LoginPayload): Promise<SuccessResponse<AuthResponse>> {
    return axiosClient.post(NextApiEndpoint.AUTH_LOGIN, payload, {
      baseURL: ''
    })
  },

  verify(payload: VerifyPayload): Promise<SuccessResponse<any>> {
    return axiosClient.put(ApiEndpoint.VERIFY_USER, payload)
  },

  logout(): Promise<SuccessResponse<any>> {
    return axiosClient.delete(NextApiEndpoint.AUTH_LOGOUT, {
      baseURL: ''
    })
  },

  refreshToken(): Promise<SuccessResponse<Omit<AuthResponse, 'user'>>> {
    return axiosClient.post(
      NextApiEndpoint.AUTH_REFRESH_TOKEN,
      {},
      {
        baseURL: ''
      }
    )
  }
}
