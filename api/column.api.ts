import { ApiEndpoint } from '@/constants'
import axiosClient from './axios-client'
import { SuccessResponse, ColumnPayload, Column } from '@/models'

export const columnApi = {
  add(payload: ColumnPayload): Promise<SuccessResponse<Column>> {
    return axiosClient.post(ApiEndpoint.COLUMN_ADD, payload)
  },
  update(columnId: string, payload: Partial<Column>): Promise<SuccessResponse<Column>> {
    return axiosClient.patch(ApiEndpoint.COLUMN_UPDATE.replace('{columnId}', columnId), payload)
  },
  delete(columnId: string): Promise<SuccessResponse<{ deleteResult: string }>> {
    return axiosClient.delete(ApiEndpoint.COLUMN_UPDATE.replace('{columnId}', columnId))
  }
}