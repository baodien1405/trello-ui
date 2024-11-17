import { LoginPayload, RegisterPayload, SuccessResponse, VerifyPayload } from '@/models'
import axiosClient from './axios-client'
import { ApiEndpoint } from '@/constants'

export const authApi = {
  register(payload: Omit<RegisterPayload, 'confirm_password'>): Promise<SuccessResponse<any>> {
    return axiosClient.post(ApiEndpoint.AUTH_REGISTER, payload)
  },

  login(payload: LoginPayload): Promise<SuccessResponse<any>> {
    return axiosClient.post(ApiEndpoint.AUTH_LOGIN, payload)
  },

  verify(payload: VerifyPayload): Promise<SuccessResponse<any>> {
    return axiosClient.put(ApiEndpoint.VERIFY_USER, payload)
  }
}
