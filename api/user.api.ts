import { ApiEndpoint } from '@/constants'
import { SuccessResponse, User, UserPayload } from '@/models'
import axiosClient from './axios-client'

export const userApi = {
  update(payload: UserPayload): Promise<SuccessResponse<User>> {
    return axiosClient.put(ApiEndpoint.USER_UPDATE, payload)
  }
}
