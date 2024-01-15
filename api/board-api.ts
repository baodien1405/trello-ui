import axiosClient from './axios-client'
import {
  Board,
  SuccessResponse,
  MoveCardDiffColumnPayload,
  ListParams,
  ListResponse
} from '@/models'

export const boardApi = {
  getAll(params: Partial<ListParams>): Promise<SuccessResponse<ListResponse<Board>>> {
    return axiosClient.get(`/v1/api/boards`, { params })
  },
  get(id: string): Promise<SuccessResponse<Board>> {
    return axiosClient.get(`/v1/api/boards/${id}`)
  },
  update(id: string, payload: Partial<Board>): Promise<SuccessResponse<Board>> {
    return axiosClient.patch(`/v1/api/boards/${id}`, payload)
  },
  moveCardToDifferentColumn(payload: MoveCardDiffColumnPayload): Promise<SuccessResponse<any>> {
    return axiosClient.put(`/v1/api/boards/supports/moving_card`, payload)
  }
}
