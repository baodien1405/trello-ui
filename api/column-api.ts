import axiosClient from './axios-client'
import { SuccessResponse, ColumnPayload, Column } from '@/models'

export const columnApi = {
  add(payload: ColumnPayload): Promise<SuccessResponse<Column>> {
    return axiosClient.post(`/v1/api/columns`, payload)
  },
  update(id: string, payload: Partial<Column>): Promise<SuccessResponse<Column>> {
    return axiosClient.patch(`/v1/api/columns/${id}`, payload)
  }
}
