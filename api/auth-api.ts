import { LoginPayload, RegisterPayload, SuccessResponse } from '@/models'
import axiosClient from './axios-client'
import { ApiEndpoint } from '@/constants'

export const authApi = {
  register(payload: RegisterPayload): Promise<SuccessResponse<any>> {
    return axiosClient.post(ApiEndpoint.AUTH_REGISTER, payload)
  },

  login(payload: LoginPayload): Promise<SuccessResponse<any>> {
    return axiosClient.post(ApiEndpoint.AUTH_LOGIN, payload)
  }
}
