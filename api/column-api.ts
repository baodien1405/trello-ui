import axiosClient from './axios-client'
import { SuccessResponse, ColumnPayload } from '@/models'

export const columnApi = {
  add(payload: ColumnPayload): Promise<SuccessResponse<any>> {
    return axiosClient.post(`/v1/api/columns`, payload)
  }
}
