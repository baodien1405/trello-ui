import axiosClient from './axios-client'
import { SuccessResponse, ColumnPayload, Column } from '@/models'

export const columnApi = {
  add(payload: ColumnPayload): Promise<SuccessResponse<Column>> {
    return axiosClient.post(`/v1/api/columns`, payload)
  },
  update(columnId: string, payload: Partial<Column>): Promise<SuccessResponse<Column>> {
    return axiosClient.patch(`/v1/api/columns/${columnId}`, payload)
  },
  delete(columnId: string): Promise<SuccessResponse<{ deleteResult: string }>> {
    return axiosClient.delete(`/v1/api/columns/${columnId}`)
  }
}
